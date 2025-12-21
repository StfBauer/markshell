'use strict';

const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;
// Require DOM Object in NodeJS
// @ts-ignore
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

// Loading syntax highlighter
// @ts-ignore
const prismjs = require('prismjs/prism');

// load all supported languages
// @ts-ignore
const loadLanguages = require('prismjs/components/');
// Languages will be loaded on-demand for better performance

/**
 * Cache of loaded languages to avoid redundant loading
 * @type {Set<string>}
 */
const loadedLanguagesCache = new Set();

/**
 * Comprehensive language alias mapping based on PrismJS components
 * Maps common aliases to their canonical language names
 * @type {Object<string, string>}
 */
const languageAliases = {
    // JavaScript ecosystem
    'js': 'javascript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',

    // Shell/Bash variants
    'sh': 'bash',
    'shell': 'bash',
    'console': 'bash',
    'command': 'bash',
    'bash session': 'bash',
    'zsh': 'bash',

    // Python
    'py': 'python',
    'py3': 'python',
    'python3': 'python',

    // Ruby
    'rb': 'ruby',

    // Markup languages
    'html': 'markup',
    'xml': 'markup',
    'svg': 'markup',
    'mathml': 'markup',
    'ssml': 'markup',

    // C family
    'c++': 'cpp',
    'c#': 'csharp',
    'cs': 'csharp',

    // Other common aliases
    'yml': 'yaml',
    'md': 'markdown',
    'dockerfile': 'docker',
    'objc': 'objectivec',
    'hs': 'haskell',
    'rs': 'rust',
    'kt': 'kotlin',
    'proto': 'protobuf',
    'coffee': 'coffeescript',
    'gawk': 'awk',
    'hbs': 'handlebars',
    'mustache': 'handlebars',
    'g4': 'antlr4',
    'ino': 'arduino',
    'adoc': 'asciidoc',
    'idr': 'idris',
    'eta': 'ejs',
};

/**
 * @readonly
 * @enum {string}
 */
const sourceTheme = {
    COY: 'coy',
    DARK: 'dark',
    FUNKY: 'funky',
    OKAIDIA: 'okaidia',
    PRISM: 'prism',
    SOLARIZE: 'solarizelight',
    TOMORROW: 'tomorrow',
    TWILIGHT: 'twilight',
}

// load default theme
let theme = require('./themes/okaidia.theme');

// get all theme tokens
let themeTokenKeys = Object.keys(theme.token);

/**
 * Detect style options for given classlist provmvided by PrismJS
 * @param {DOMTokenList} tokens Style Sheet class tokens added by PrismJS
 */
const getHighlightToken = (tokens) => {

    let tokenFound = null;

    for (let i = 0; i < tokens.length; i++) {

        if (themeTokenKeys.indexOf(tokens[i]) !== -1) {

            tokenFound = theme.token[tokens[i]];
            break;
        }

    }

    if (tokenFound !== null) {

        return tokenFound;

    } else {

        return (content) => {
            return content
        };

    }

}

/**
 * Parses DOM Elements from PrismJS formatted content
 * @param {Array<Element>} domElement - DOM Element from returned source code
 * @param {number} recLevel - Recursion Level of DOM tree
 */
const parseFormatedContent = (domElement, recLevel) => {

    let highlightedSource = ""

    // @ts-ignore
    domElement.forEach((element, index) => {

            if (element.hasChildNodes()) {

                let hlCode = getHighlightToken(element.classList);
                // @ts-ignore
                highlightedSource += hlCode(parseFormatedContent(element.childNodes, recLevel + 1));

            } else {

                highlightedSource += element.textContent;

            }

        }

    );

    return highlightedSource;

}

/**
 * Define by different themes this function provides a consistent background
 * @param {string} source hightlighted source code
 * @param {string} originalSource original source code used to fill background
 */
const _addBackground = (source, originalSource) => {

    // Add border through leeding and ending linkes
    source = `\n${source}\n`;
    originalSource = `\n${originalSource}\n`;

    // split formated and unformated source for better line filling;
    let sourceLines = source.split('\n');
    let originalSourceLines = originalSource.split('\n');
    let termColumns = process.stdout.columns;

    let bgAddedSource = [];

    for (let i = 0; i < sourceLines.length - 1; i++) {

        let fill2end = termColumns - originalSourceLines[i].length;

        // I case line is longer than one line
        if (fill2end < 0) {
            fill2end = termColumns - (originalSourceLines[i].length % termColumns);
        }

        bgAddedSource.push(
            theme.background(sourceLines[i]) + theme.toEOL((" ").repeat(fill2end))
        );

    }

    return bgAddedSource.join('\n');

}

/**
 * Resolves language aliases to canonical names
 * @param {string} language - Language identifier (may be an alias)
 * @returns {string|null} - Canonical language name or null if no language provided
 */
const resolveLanguageAlias = (language) => {
    if (!language) return null;

    const normalized = language.toLowerCase().trim();
    return languageAliases[normalized] || normalized;
};

/**
 * Dynamically loads a language component if not already loaded
 * @param {string} language - Language to load (canonical name or alias)
 * @returns {boolean} - True if language is available, false otherwise
 */
const ensureLanguageLoaded = (language) => {
    if (!language) return false;

    // Resolve alias to canonical name
    const canonicalLang = resolveLanguageAlias(language);
    if (!canonicalLang) return false;

    // Check if already loaded in our cache
    if (loadedLanguagesCache.has(canonicalLang)) {
        return true;
    }

    // Check if language exists in Prism.languages (might be pre-loaded)
    // @ts-ignore
    if (Prism.languages[canonicalLang] !== undefined) {
        loadedLanguagesCache.add(canonicalLang);
        return true;
    }

    // Attempt to load the language
    try {
        // Suppress PrismJS warnings for this operation
        const originalSilent = loadLanguages.silent;
        loadLanguages.silent = true;

        // Load the language (PrismJS handles dependencies automatically)
        loadLanguages([canonicalLang]);

        // Restore original silent setting
        loadLanguages.silent = originalSilent;

        // Verify it loaded successfully
        // @ts-ignore
        if (Prism.languages[canonicalLang] !== undefined) {
            loadedLanguagesCache.add(canonicalLang);
            return true;
        }

        return false;

    } catch (error) {
        // Language loading failed
        return false;
    }
};

/**
 * Get information about loaded languages (for debugging/monitoring)
 * @returns {{count: number, languages: string[]}} - Statistics about loaded languages
 */
const getLoadedLanguagesInfo = () => {
    return {
        count: loadedLanguagesCache.size,
        languages: Array.from(loadedLanguagesCache).sort()
    };
};

/**
 *
 * @param {string} source
 * @param {string} language
 * @param {sourceTheme} outTheme
 */
const _highlight = (source, language, outTheme) => {

    // Detect if theme value is supported - otherwise just use default Okaidia theme
    if (outTheme !== undefined) {

        let themePath = path.join(__dirname, './themes/', outTheme + '.theme'),
            filePath = themePath + '.js';

        if (fs.existsSync(filePath)) {

            theme = require(filePath);
            themeTokenKeys = Object.keys(theme.token);

        } else {

            throw `Theme '${outTheme}' do not exist`

        }

    }

    // If no language specified, render as plain text
    if (!language) {
        return _addBackground(source, source);
    }

    // Dynamically load the language if needed
    const languageLoaded = ensureLanguageLoaded(language);

    if (!languageLoaded) {
        // Language doesn't exist or failed to load - fallback to plain text
        // Optionally log a warning (can be configured via environment variable)
        if (process.env.MARKSHELL_WARN_UNKNOWN_LANG === 'true') {
            console.warn(`[markshell] Unknown language '${language}' - rendering as plain text`);
        }
        return _addBackground(source, source);
    }

    // Get the canonical language name for highlighting
    const canonicalLang = resolveLanguageAlias(language);

    // @ts-ignore - Prism is loaded globally
    if (Prism.languages[canonicalLang] !== undefined) {
        // @ts-ignore
        const prismCode = prismjs.highlight(source, Prism.languages[canonicalLang], canonicalLang);
        // load HTML fragment
        const dom = JSDOM.fragment(prismCode);

        var highlightedSource = parseFormatedContent(dom.childNodes, 0);

        return _addBackground(highlightedSource, source);

    } else {
        // Shouldn't reach here if ensureLanguageLoaded worked correctly
        return _addBackground(source, source);
    }

}

module.exports = {
    highlight: _highlight,
    themes: sourceTheme,
    availableThemes: sourceTheme,
    getLoadedLanguagesInfo: getLoadedLanguagesInfo,
    resolveLanguageAlias: resolveLanguageAlias
}
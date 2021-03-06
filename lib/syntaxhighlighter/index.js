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
loadLanguages();

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

        if (this.themeTokenKeys.indexOf(tokens[i]) !== -1) {

            tokenFound = this.theme.token[tokens[i]];
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
            this.theme.background(sourceLines[i]) + this.theme.toEOL((" ").repeat(fill2end))
        );

    }

    return bgAddedSource.join('\n');

}

/**
 * 
 * @param {string} source 
 * @param {string} language 
 * @param {sourceTheme} outTheme 
 */
const _highlight = (source, language, outTheme) => {

    // Detect if theme value is supported - otherwise just use default Okaida theme
    if (outTheme !== undefined) {

        let themePath = path.join(__dirname, './themes/', outTheme + '.theme'),
            filePath = themePath + '.js';

        if (fs.existsSync(filePath)) {

            this.theme = require(filePath);
            this.themeTokenKeys = Object.keys(theme.token);


        } else {

            throw `Theme '${outTheme}' do not exists`

        }

    }

    // Parse source code and return HTML from PrismJS output
    // console.log(language, Prism.languages[language]);
    // @ts-ignore
    Prism.languages['sh'] = Prism.languages['shell'];
    // @ts-ignore
    Prism.languages['console'] = Prism.languages['shell'];
    // @ts-ignore
    Prism.languages['command'] = Prism.languages['shell'];
    // @ts-ignore
    Prism.languages['bash session'] = Prism.languages['shell'];

    // @ts-ignore
    if (Prism.languages[language] !== undefined) {
        // @ts-ignore
        const prismCode = prismjs.highlight(source, Prism.languages[language], language);
        // load HTML fragment
        const dom = JSDOM.fragment(prismCode);

        // console.log('Original Source:\n', source);

        var highlightedSource = parseFormatedContent(dom.childNodes, 0);

        return _addBackground(highlightedSource, source);

    } else {

        return _addBackground(source, source);

        // throw `Language '${language}' couldn't be found`;

    }

}

module.exports = {
    highlight: _highlight,
    themes: sourceTheme,
    availableThemes: sourceTheme
}
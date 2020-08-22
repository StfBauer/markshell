'use strict';

const fs = require('fs');
const path = require('path');
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
    OKADIDO: 'okaido',
    PRISM: 'prism',
    SOLARIZE: 'solarize',
    TOMORROW: 'tomorrow',
    TWILIGHT: 'twilight',
}

// load default theme
let theme = require('./themes/okaido.theme');

// get all theme tokens
const themeTokenKeys = Object.keys(theme.token);

/**
 * Detect style options for given classlist provided by PrismJS
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

    for (let i = 0; i < sourceLines.length; i++) {

        // add empty space for better indent
        sourceLines[i] = sourceLines[i].trim() === "" ? " " : ` ${sourceLines[i]} `;
        originalSourceLines[i] = originalSourceLines[i].trim() === "" ? " " : ` ${originalSourceLines[i]} `;;

        // replace potential tab stops to spaces
        sourceLines[i] = sourceLines[i].replace(/\t/ig, "  ");
        originalSourceLines[i] = originalSourceLines[i].replace(/\t/ig, "  ");

        if (originalSourceLines[i].trim() !== "  ") {

            // color all spaces in between
            sourceLines[i] = sourceLines[i].replace(/\s/ig, " ");

        }

        // append spaced to the end of the line
        sourceLines[i] = theme.background(sourceLines[i]) + theme.toEOL((" ").repeat(process.stdout.columns - originalSourceLines[i].length - 1));

    }

    return sourceLines.join('\n');
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

            theme = require(filePath);

        } else {

            throw `Theme '${outTheme}' do not exists`
        
        }

    }

    // Parse source code and return HTML from PrismJS output
    // console.log(language, Prism.languages[language]);
    // if(Prism.languages[language])
    // @ts-ignore
    Prism.languages['sh'] = Prism.languages['shell'];
    // @ts-ignore
    Prism.languages['console'] = Prism.languages['shell'];
    // @ts-ignore
    Prism.languages['bash session'] = Prism.languages['shell'];

    // @ts-ignore
    if (Prism.languages[language] !== undefined) {
        // @ts-ignore
        const prismCode = prismjs.highlight(source, Prism.languages[language], language);
        // load HTML fragment
        const dom = JSDOM.fragment(prismCode);

        var highlightedSource = parseFormatedContent(dom.childNodes, 0);

        return _addBackground(highlightedSource, source);

    } else {

        throw `Language '${language}' couldn't be found`;

    }

}

module.exports = {
    highlight: _highlight,
    themes: sourceTheme,
    availableThemes: sourceTheme
}
// Require DOM Object in NodeJS
const fs = require('fs');
const path = require('path');

const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

// Loading syntax highlighter
const prismjs = require('prismjs/prism');

// load all supported languages
const loadLanguages = require('prismjs/components/');
loadLanguages();

// load default theme
let theme = require('./themes/okaido.theme');

// get all theme tokens
const themeTokenKeys = Object.keys(theme.token);

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

const parseFormatedContent = (domElement, recLevel) => {

    let highlightedSource = ""

    domElement.forEach((element, index) => {

            if (element.hasChildNodes()) {

                let hlCode = getHighlightToken(element.classList);
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
        sourceLines[i] = sourceLines[i].replace(/\t/ig, theme.inlineSpace("  "));
        originalSourceLines[i] = originalSourceLines[i].replace(/\t/ig, "  ");

        if (originalSourceLines[i].trim() !== "  ") {

            // color all spaces in between
            sourceLines[i] = sourceLines[i].replace(/\s/ig, theme.inlineSpace(" "));

        }

        // append spaced to the end of the line
        sourceLines[i] = theme.background(sourceLines[i]) + theme.toEOL((" ").repeat(process.stdout.columns - originalSourceLines[i].length - 1));

    }

    return sourceLines.join('\n');
}

const _highlight = (source, language, outTheme) => {

    let themePath = path.join(__dirname, './themes/', outTheme + '.theme'),
        filePath = themePath + '.js';

    if (fs.existsSync(filePath)) {

        theme = require(filePath);

    }

    const prismCode = prismjs.highlight(source, Prism.languages[language], language);

    // load HTML fragment
    const dom = JSDOM.fragment(prismCode);

    var highlightedSource = parseFormatedContent(dom.childNodes, 0);



    return _addBackground(highlightedSource, source);

}

module.exports = {
    highlight: _highlight
}
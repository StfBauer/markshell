'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const syntaxHighlighter = require('./syntaxhighlighter');



/**
 * @property {chalk} headline Headline format
 * @property {chalk} bold Bold string format
 * @property {chalk} italic Italic format
 * @property {chalk} strikethrough Strike-throught format
 * @property {chalk} code Code format
 * @property {chalk} inlineCode Inline markdown code format
 * @property {chalk} blockQuote Blockquote format
 * @property {syntaxHighlighter} sourceCodeTheme Syntax hightlighter theme
 */
const defTheme = {
    headline: chalk.bold.keyword('yellow'),
    bold: chalk.bold.keyword('white'),
    italic: chalk.italic.keyword('white'),
    strikethrough: chalk.strikethrough,
    code: chalk.bgGray.white.bold,
    inlineCode: chalk.bgGray.white.bold,
    blockQuote: chalk.italic.bgMagentaBright.white.bold,
    sourceCodeTheme: syntaxHighlighter.themes.OKADIDO
}

/**
 * Replace common inline MarkDown tokens by using regular expressions
 * @param {string} content of MarkDown file
 * @param {Regexp} regexMatch Regular expretion of MarkDown format
 * @param {chalk} colorFunction Chalk color definition
 */
const highlightText = (content, regexMatch, colorFunction) => {
    var regex = new RegExp(regexMatch);
    var index = 0,
        result, counter = 1;
    var tokenIndex = [];

    var newText = content;

    while (result = regex.exec(content)) {

        tokenIndex.push(result.index);

        if (tokenIndex.length % 2 == 0) {

            var shortSting = content.substr(
                tokenIndex[tokenIndex.length - 2],
                tokenIndex[tokenIndex.length - 1] - tokenIndex[tokenIndex.length - 2] + 2
            );

            newText = newText.replace(shortSting, colorFunction(shortSting.replace(regexMatch, '')));

        }

        counter += 1;
    }

    return newText;

}

/**
 * Format all headlines
 * @param {string} content of MarkDown file
 */
const headlines = (content) => {

    let newContent = content.split('\n');

    newContent.forEach((line, index) => {
        if (line.startsWith('#')) {
            var headLine = line.replace(/\#/ig, '');
            newContent[index] = this._theme.headline(headLine.trim());
        }
    });

    return newContent.join('\n');

}


/**
 * Formats source code blocks without Prismjs
 * @param {string} content of MarkDown file
 */
const codeBlock = (content) => {

    let newContent = content.split('\n'),
        codeEnabled = false;

    newContent.forEach((line, index) => {

        if (line.startsWith('```') || codeEnabled) {

            codeEnabled = codeEnabled === true && line.startsWith('```') ? false : true;

            var headLine = line.replace(/\`\`\`/ig, '--- ');
            newContent[index] = this._theme.code(headLine + (' '.repeat(process.stdout.columns - headLine.length)));

        }

    });

    return newContent.join('\n');
}

/**
 * Formats source code blocks using PrismJS
 * @param {string} content of MarkDown file
 */
const highlightedCodeBlock = (content) => {

    let allBlocks = content.replace(/\`\`\`/ig, '```codeblock|').split('```');

    allBlocks.forEach((element, index) => {

        if (element.startsWith('codeblock') && index % 2 === 1) {

            var codeBlock = element.replace('codeblock|', '').split('\n');
            var language = codeBlock.shift();

            var hightLightedSource = syntaxHighlighter.highlight(codeBlock.join('\n'), language, 'okaido');

            allBlocks[index] = `--- ${language} \n${hightLightedSource}`;

            // replace asterisk to heavy asterisk to avoid replacement
            allBlocks[index] = allBlocks[index].replace(/\*/ig, `\u2731`);

        } else {
            allBlocks[index] = element.replace('codeblock|', '------');
        }

    });

    return allBlocks.join('');

}

/**
 * Formats Blockquote
 * @param {string} content of markdown file
 * @param {number} [indentLeft=3] default indent on left side
 * @param {number} [indentRight=3] default indent on right side
 */
const addBlockQuote = (content, indentLeft = 3, indetRight = 3) => {

    let newContent = content.split('\n');
    var columns = process.stdout.columns - 4;
    let maxWordLength = columns - indentLeft - indetRight;

    newContent.forEach((line, index) => {

        if (line.startsWith('>')) {

            var quote = line.replace(/>/ig, '');

            var words = quote.split(' ');

            var newLine = '';
            var curLine = 0;

            words.forEach(element => {

                var calcLine = Math.floor(
                    (newLine.length + element.length + 2) / maxWordLength
                );

                if (curLine !== calcLine) {

                    curLine = calcLine;

                    newLine += '\n' + element;

                } else {

                    newLine += element + ' ';

                }

            });

            var blockQuoteLines = newLine.split('\n');

            newContent[index] = "";

            blockQuoteLines.forEach(line => {

                let fillUpRight = maxWordLength - line.trim().length;

                let fillUpString = fillUpRight > 0 ? " ".repeat(fillUpRight) : "";

                newContent[index] += " ".repeat(indentLeft) +
                    this._theme.blockQuote(
                        line.trim() + fillUpString
                    ) + "\n";

            })

        }

    });

    return newContent.join('\n');

}

/**
 * Formats bold elements in MarkDown
 * @param {string} content of markdown file
 */
const addBold = (content) => {

    return highlightText(content, /\*\*/ig, this._theme.bold);

}

/**
 * Formats italic elements in MarkDown
 * @param {string} content of markdown file
 */
const addItalic = (content) => {

    return highlightText(content, /\*/ig, this._theme.italic);

}

/**
 * Formats strikethrough elements in MarkDown
 * @param {string} content 
 */
const addStrikeThrough = (content) => {

    return highlightText(content, /\~\~/ig, this._theme.strikethrough);

}

/**
 * Formats code blocks
 * @param {string} content of markdown file 
 */
const addCode = (content) => {

    return codeBlock(content);

}

/**
 * Format `inline` source code in markdown files
 * @param {string} content of markdown file
 */
const addInlineCode = (content) => {

    return highlightText(content, /\`/ig, this._theme.inlineCode);

}

/**
 * Outputs formated string
 * @param {string} filepath to markdown file
 */
const _toConsole = (filepath) => {

    if(!filepath.toLowerCase().endsWith('.md')){
        throw "File needs to be a markdown file ending with '.md'";
    }

    let content = _toRawContent(filepath);

    console.log(content);

}

/**
 * Returns the raw formatted string
 * @param {string} filepath to markdown file 
 */
const _toRawContent = (filepath) => {

    if(!filepath.toLowerCase().endsWith('.md')){
        throw "File needs to be a markdown file ending with '.md'";
    }

    let content = fs.readFileSync(filepath).toString();

    if (typeof this._theme === 'undefined') {
        _setTheme(defTheme);
    }

    content = highlightedCodeBlock(content);
    content = addBold(content);
    content = addItalic(content);
    content = addStrikeThrough(content);
    // Maybe obsolete: content = addCode(content);
    content = addInlineCode(content);
    content = headlines(content);
    content = addBlockQuote(content);


    return content;

}

/**
 * Define a custom theme for the output
 * @param {*} customTheme 
 */
const _setTheme = (customTheme) => {

    this._theme = customTheme;

}

/**
 * Returns the default theme
 */
const _getTheme = () => {

    console.log(Object.keys(JSON.parse(JSON.stringify(defTheme))));

    return defTheme;

}

module.exports = {
    getTheme: _getTheme,
    setTheme: _setTheme,
    toConsole: _toConsole,
    toRawContent: _toRawContent,
    sourceTheme: syntaxHighlighter.themes
}
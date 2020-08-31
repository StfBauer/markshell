'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const wrapAnsi = require('wrap-ansi');
const syntaxHighlighter = require('./syntaxhighlighter');
const theme = require('./syntaxhighlighter/themes/okaido.theme');
const {
    connect
} = require('http2');
let _theme;

/**
 * Default indent definitons
 * @property {number} blockquote Indent of blockquote
 * @property {number} definition list Indent of blockquote
 */
const defIndents = {
    blockquote: 3,
    definitionList: 3
}

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
    inlineCode: chalk.keyword('orange'),
    blockQuote: chalk.italic.bgMagentaBright.white.bold,
    sourceCodeTheme: syntaxHighlighter.themes.OKADIDO,
    availableSourceThemes: syntaxHighlighter.availableThemes,
    indents: defIndents
}

const _allThemes = () => {
    return syntaxHighlighter.availableThemes;
}

/**
 * Replace common inline MarkDown tokens by using regular expressions
 * @param {string} content of MarkDown file
 * @param {RegExp} regexMatch Regular expretion of MarkDown format
 * @param {chalk} colorFunction Chalk color definition
 */
const _highlightText = (content, regexMatch, colorFunction) => {

    let match;

    while ((match = regexMatch.exec(content)) !== null) {

        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === regexMatch.lastIndex) {
            regexMatch.lastIndex++;
        }

        // get identifier (first group) and content in between (group)
        if (match.length >= 2 && match[0] !== null && match[1] !== null) {

            content = content.replace(match[0], colorFunction(match[1]));

        }

    }

    return content;

}

/**
 * Format all headlines
 * @param {string} content of MarkDown file
 */
const _headlines = (content) => {

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
const _codeBlock = (content) => {

    let codeRegex = new RegExp(/(\`\`\`)(.*?)(\`\`\`)/igs);
    let newContent = content.match(codeRegex);

    newContent.forEach((element) => {

        let langRegex = new RegExp(/(\`\`\`)(.*?)(\n)/igs);
        let langIdentifiere = element.match(langRegex);

        if (langIdentifiere.length === 1) {

            let lang = langIdentifiere[0].replace(/\`\`\`/, '').replace(/\n/, '');

            //Replace language
            let source = element.replace(`\`\`\`${lang}\n`, '');

            //Replace ```
            source = source.replace(`\`\`\``, '');

            try {
                let hlSource = syntaxHighlighter.highlight(source, lang.trim(), this._theme.sourceCodeTheme);

                content.replace(element, hlSource)

            } catch (e) {
                throw e;
            }


        }

    })

    return content;

}

/**
 * Formats source code blocks using PrismJS
 * @param {string} content of MarkDown file
 */
const _highlightedCodeBlock = (content) => {

    let codeRegex = new RegExp(/(\`\`\`)(.*?)(\`\`\`)/igs);
    let newContent = content.match(codeRegex);

    newContent.forEach((element) => {

        let langRegex = new RegExp(/(\`\`\`)(.*?)(\n)/igs);
        let langIdentifiere = element.match(langRegex);

        if (langIdentifiere.length === 1) {

            let lang = langIdentifiere[0].replace(/\`\`\`/, '').replace(/\n/, '');

            //Replace language
            let source = element.replace(`\`\`\`${lang}\n`, '');

            //Replace ```
            source = source.replace(`\`\`\``, '');

            try {
                let hlSource = syntaxHighlighter.highlight(source, lang.trim(), this._theme.sourceCodeTheme);

                content = content.replace(element, hlSource)

            } catch (e) {
                throw e;
            }

        }

    })

    // console.log(content)

    return content;

}

/**
 * Formats Blockquote
 * @param {string} content of markdown file
 * @param {number} [indentLeft=3] default indent on left side
 * @param {number} [indentRight=3] default indent on right side
 */
const _addBlockQuote = (content, indentLeft = 3, indentRight = 3) => {

    let newContent = content.split('\n');
    var columns = process.stdout.columns - 4;
    let maxWordLength = columns - indentLeft - indentRight;

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
const _addBold = (content) => {

    return _highlightText(content, /\*\*(.*?)\*\*/ig, this._theme.bold);

}

/**
 * Formats italic elements in MarkDown
 * @param {string} content of markdown file
 */
const _addItalic = (content) => {

    return _highlightText(content, /\_(.*?)\_/ig, this._theme.italic);

}

/**
 * Formats strikethrough elements in MarkDown
 * @param {string} content 
 */
const _addStrikeThrough = (content) => {

    return _highlightText(content, /\~\~(.*?)\~\~/ig, this._theme.strikethrough);

}

/**
 * Formats code blocks
 * @param {string} content of markdown file 
 */
const _addCode = (content) => {

    return _codeBlock(content);

}

/**
 * Format `inline` source code in markdown files
 * @param {string} content of markdown file
 */
const _addInlineCode = (content) => {

    // return _highlightText(content, /\`/ig, this._theme.inlineCode);
    return _highlightText(content, /`(.*?[^`])`/ig, this._theme.inlineCode);

}

/**
 * Format `inline` source code in markdown files
 * @param {string} content of markdown file
 */
const _addHyperlinks = (content) => {

    let regExp = new RegExp(/\[(.*?)\]\((.*?)\)/ig)
    let elements = content.match(regExp);

    elements.forEach(element => {

        let linkMatch = new RegExp(/\[(?<linktext>.*?)\]\((?<link>.*?)\)/ig);
        let href = linkMatch.exec(element);

        let newHyperlink;

        // link and text are the same.
        if (href.groups.link === href.groups.linktext) {
            newHyperlink = href.groups.link;
        } else
            // link is internal
            if (href.groups.link.startsWith('.')) {

                newHyperlink = href.groups.linktext;

            }
        // now everything else
        else {
            newHyperlink = `${href.groups.linktext} (${href.groups.link})`;
        }

        content = content.replace(element, newHyperlink);

    });

    return content;

}

/**
 * Outputs formated string
 * @param {string} filepath to markdown file
 */
const _toConsole = (filepath) => {

    if (!filepath.toLowerCase().endsWith('.md')) {
        throw "File needs to be a markdown file ending with '.md'";
    }

    let content = _toRawContent(filepath);

    console.log(content);

}

/**
 * Format definiton list
 * @param {string} content of Markdown file
 */
const _addDefinitionList = (content, leftIndent = 3) => {

    let contentBlocks = content.split('\n');

    contentBlocks.forEach((element, index) => {

        if (element.startsWith(':')) {

            // let prevContentBlock = contentBlocks[index - 1];

            // if (!prevContentBlock.startsWith(':') &&
            //     !prevContentBlock.startsWith(" ")) {

            //     contentBlocks[index - 1] = this._theme.bold(prevContentBlock);

            // }

            let newDefList = element.substr(2, element.length);
            let indent = " ".repeat(leftIndent);

            let fill2end = process.stdout.columns - newDefList.length;

            // I case line is longer than one line
            if (fill2end < 0) {
                fill2end = process.stdout.columns - (newDefList.length % process.stdout.columns);
            }

            contentBlocks[index] = indent + element.substr(2, element.length) + " ".repeat(fill2end);

        }

    });

    return contentBlocks.join('\n');

}

/**
 * Returns the raw formatted string
 * @param {string} filepath to markdown file 
 */
const _toRawContent = (filepath) => {

    if (!fs.existsSync(filepath)) {
        throw `File ${filepath} path do no exist`
    }

    if (!filepath.toLowerCase().endsWith('.md')) {
        throw "File needs to be a markdown file ending with '.md'";
    }

    let content;

    try {

        content = fs.readFileSync(filepath).toString();

    } catch (e) {

        throw e;

    }

    console.log(this._theme);

    if (typeof this._theme === 'undefined') {
        _setTheme(defTheme);
    }

    try {
        console.log('Def Indents:::: ', this._theme.indents.definitionList);
        content = _addDefinitionList(content, this._theme.indents.definitionList);
    } catch (e) {
        throw `Error in addDefinitionList: ${e}`;
    }

    try {
        content = _addHyperlinks(content);
    } catch (e) {
        throw `Error in addDefinitionList: ${e}`;
    }

    try {
        content = _addInlineCode(content);
    } catch (e) {
        throw `Error in addInlineCode: ${e}`;
    }

    try {
        content = _codeBlock(content);
    } catch (e) {
        throw `Error in Highlighted Code: ${e}`;
    }

    try {
        content = _highlightedCodeBlock(content);
    } catch (e) {
        throw `Error in Highlighted Code: ${e}`;
    }

    try {
        content = _addBold(content);
    } catch (e) {
        throw `Error in addBold Code: ${e}`;
    }

    try {
        content = _addItalic(content);
    } catch (e) {
        throw `Error in addItalic: ${e}`;
    }

    try {
        content = _addStrikeThrough(content);
    } catch (e) {
        throw `Error in addStrikeThrough: ${e}`;
    }

    try {
        content = _headlines(content);
    } catch (e) {
        throw `Error in headlines: ${e}`;
    }

    try {
        content = _addBlockQuote(content, this._theme.indents.blockQuote);
    } catch (e) {
        throw `Error in headlines: ${e}`;
    }

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

    return defTheme;

}

module.exports = {
    getTheme: _getTheme,
    setTheme: _setTheme,
    toConsole: _toConsole,
    toRawContent: _toRawContent,
    sourceTheme: syntaxHighlighter.themes
}
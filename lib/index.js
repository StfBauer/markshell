'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const syntaxHighlighter = require('./syntaxhighlighter');
const admonitions = require('./admonitions');
const EOL = require('os').EOL;
const theme = require('./syntaxhighlighter/themes/okaido.theme');
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
 * @property {boolean} enabled true = enabled, false = disabled
 * @property {boolean} useSafeColors true = enbaled, false = disabled
 * @property {number} beforeIndent before title style
 * @property {number} afterIndent after title style
 */
const admonitionSettings = {
    enabled: true,
    useSafeColors: false,
    getStyles: admonitions.getStyles,
    setStyles: admonitions.setStyles
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
 * @property {number} indents Define how many spaces get added to blockquotes and definition lists
 * @property {boolean} useAdmonitions Define if markdown should use Admonitions plugin
 * @property {admonitionSettings} Addmonition settings
 * @property {string} includePath Include path for external files
 */
const defTheme = {
    headline: chalk.bold.keyword('yellow'),
    bold: chalk.bold.keyword('white'),
    italic: chalk.italic.keyword('white'),
    strikethrough: chalk.strikethrough,
    /** @deprecated Used before syntax highlighter */
    code: chalk.bgGray.white.bold,
    inlineCode: chalk.keyword('orange'),
    blockQuote: chalk.italic.bgMagentaBright.white.bold,
    sourceCodeTheme: syntaxHighlighter.themes.OKADIDO,
    availableSourceThemes: syntaxHighlighter.availableThemes,
    indents: defIndents,
    admonitions: admonitionSettings,
    includePath: null
}

const _allThemes = () => {
    return syntaxHighlighter.availableThemes;
}

/**
 * Replace common inline MarkDown tokens by using regular expressions
 * @param {string} content of MarkDown file
 * @param {RegExp} regexMatch Regular expretion of MarkDown format
 * @param {chalk} colorFunction Chalk color definition
 * @param {number} removeChars Removes x characters from the beginning nad end of the word.
 */
const _highlightText = (content, regexMatch, colorFunction, removeChars = null) => {

    let match;

    // Define new content for replacement
    let newContent = content;

    while ((match = regexMatch.exec(content)) !== null) {

        // This is necessary to avoid infinite loops with zero-width matches
        if (regexMatch.lastIndex === undefined && match.index === regexMatch.lastIndex) {
            regexMatch.lastIndex++;
        }

        // get identifier (first group) and content in between (group)
        if (match.length >= 2 && match[0] !== null && match[1] !== null) {

            if (removeChars === null) {

                newContent = newContent.replace(match[0], colorFunction(match[1]));

            } else {

                newContent = newContent.replace(
                    match[0],
                    colorFunction(
                        match[1].substr(
                            removeChars,
                            match[0].length - 1 - removeChars)
                    )
                );

            }

        }

    }

    return newContent;

}

/**
 * Replace common inline MarkDown tokens by using regular expressions
 * @param {string} content of MarkDown file
 * @param {RegExp} regexMatch Regular expretion of MarkDown format
 */
const _removeImages = (content, regexMatch) => {

    let match;

    // Define new content for replacement
    let newContent = content;

    while ((match = regexMatch.exec(content)) !== null) {

        // This is necessary to avoid infinite loops with zero-width matches
        if (regexMatch.lastIndex === undefined && match.index === regexMatch.lastIndex) {
            regexMatch.lastIndex++;
        }

        // get identifier (first group) and content in between (group)
        if (match.length >= 2 && match[0] !== null && match[1] !== null) {

            newContent = newContent.replace(
                match[0], ''
            );

        }

    }

    return newContent;

}


/**
 * Format all headlines
 * @param {string} content of MarkDown file
 */
const _headlines = (content) => {

    let newContent = content.split(EOL);

    newContent.forEach((line, index) => {
        if (line.startsWith('#')) {
            var headLine = line.replace(/\#/ig, '');
            newContent[index] = this._theme.headline(headLine.trim());
        }
    });

    return newContent.join(EOL);

}

/**
 * Formats source code blocks without Prismjs
 * @param {string} content of MarkDown file
 */
const _codeBlock = (content) => {

    let codeRegex = new RegExp(/(\`\`\`)(.*?)(\`\`\`)/igs);
    let newContent = content.match(codeRegex);

    newContent.forEach((element) => {

        let langRegex = new RegExp(/(\`\`\`)(.*?)(\r?\n)/igs);
        let langIdentifiere = element.match(langRegex);

        if (langIdentifiere.length === 1) {

            let lang = langIdentifiere[0].replace(/\`\`\`/, '').replace(/\r?\n/, '');

            //Replace language
            let source = element.replace(`\`\`\`${lang}\r?\n`, '');

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

    if (newContent === null) {
        return content;
    }

    newContent.forEach((element) => {

        let langRegex = new RegExp(/(\`\`\`)(.*?)(\r?\n)/igs);
        let langIdentifiere = element.match(langRegex);

        if (langIdentifiere.length === 1) {

            let lang = langIdentifiere[0].replace(/\`\`\`/, '').replace(/\r?\n/, '').trim();

            //Replace language
            let source = element.replace(`\`\`\`${lang}${EOL}`, '');

            //Replace ```
            source = source.replace(`\`\`\``, '');

            try {

                let hlSource = syntaxHighlighter.highlight(source, lang, this._theme.sourceCodeTheme);

                content = content.replace(element, hlSource)

            } catch (e) {

                throw e;

            }

        }

    })

    return content;

}

/**
 * Formats Blockquote
 * @param {string} content of markdown file
 * @param {number} [indentLeft=3] default indent on left side
 * @param {number} [indentRight=3] default indent on right side
 */
const _addBlockQuote = (content, indentLeft = 3, indentRight = 3) => {

    let newContent = content.split(EOL);
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

                    newLine += EOL + element;

                } else {

                    newLine += element + ' ';

                }

            });

            var blockQuoteLines = newLine.split(EOL);

            newContent[index] = "";

            blockQuoteLines.forEach(line => {

                let fillUpRight = maxWordLength - line.trim().length;

                let fillUpString = fillUpRight > 0 ? " ".repeat(fillUpRight) : "";

                newContent[index] += " ".repeat(indentLeft) +
                    this._theme.blockQuote(
                        line.trim() + fillUpString
                    ) + EOL;

            })

        }

    });

    return newContent.join(EOL);

}

// const _extPyMDown = (content, externalFound, baseDir) => {

//     let replacements = [];

//     externalFound.forEach(element => {

//         let filename = /\{\!(.*?)\!\}/.exec(element);

//         if (filename[1] !== undefined) {

//             let partialPath = path.join(baseDir, filename[1].trim());

//             if (fs.existsSync(partialPath)) {
//                 let partialContent = fs.readFileSync(partialPath);

//                 replacements[element] = partialContent;
//             }

//         }

//     });

//     let keys = Object.keys(replacements);
//     let newContent = content;

//     for (let i = 0; i < keys.length; i++) {

//         var regExp = new RegExp(keys[i], 'ig');
//         newContent = newContent.replace(regExp, replacements[keys[i]]);

//     }

//     return newContent;

// }

/**
 * supports markdown-include
 * @param {string} content 
 * @param {Array} externalFound 
 * @param {string} baseDir 
 */
const _includeExternals = (content, externalFound, baseDir, regexDelimiter) => {

    let replacements = [];

    externalFound.forEach(element => {

        let filename = regexDelimiter.exec(element);

        if (filename[1] !== undefined) {

            let locFileName = filename[1].trim();

            if (locFileName.startsWith("'")) {
                locFileName = locFileName.replace(/'/ig, '');
            }

            if (locFileName.startsWith('"')) {
                locFileName = locFileName.replace(/"/ig, '');
            }

            let partialPath = path.join(baseDir, locFileName);

            if (fs.existsSync(partialPath)) {

                let partialContent = fs.readFileSync(partialPath);

                replacements[element] = partialContent;

            }

        }

    });

    let keys = Object.keys(replacements);
    let newContent = content;

    for (let i = 0; i < keys.length; i++) {

        var regExp = new RegExp(keys[i], 'ig');
        newContent = newContent.replace(regExp, replacements[keys[i]]);

    }

    return newContent;

}

/**
 * Include support for 
 * MDInclude https://github.com/cmacmackin/markdown-include
 * @param {string} content
 * @param {string} filepath 
 */
const _extMDInclude = (content, filepath) => {

    let extFileRegexp = new RegExp(/({!)(.*?)(!})/igs);
    let externalFound = content.match(extFileRegexp);

    let baseDir = path.dirname(filepath);

    // just in case no external could be found
    if (externalFound === null) {
        return content;
    }

    return _includeExternals(content, externalFound, baseDir, /\{\!(.*?)\!\}/);

}

/**
 * Include support for 
 * PyMdown https://facelessuser.github.io/pymdown-extensions/extensions/snippets/
 * @param {string} content
 */
const _extPyMDown = (content) => {

    if (this._theme.includePath === null) {
        return content;
    }

    let extFileRegexp = new RegExp(/^-{2,}8<-{2,}.*$/gim);
    let externalFound = content.match(extFileRegexp);

    let baseDir = this._theme.includePath;

    if (externalFound === null) {

        return content;

    }

    return _includeExternals(content, externalFound, baseDir, /^-{2,}8<-{2,}(.*)/i);

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

    let regExp = new RegExp(/\b(\_(.*?)\_)/ig);

    return _highlightText(content, regExp, this._theme.italic, 1);

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

const _addAdmonitions = (content, beforeIndent, afterIndent, titleIndent, useSafeColors) => {

    return admonitions.add(content, beforeIndent, afterIndent, titleIndent, useSafeColors);

}

/**
 * Format `inline` source code in markdown files
 * @param {string} content of markdown file
 */
const _addHyperlinks = (content) => {

    let regExp = new RegExp(/\[(.*?)\]\((.*?)\)/ig);
    let elements = content.match(regExp);

    if (elements === null) {
        return content;
    }

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

    let contentBlocks = content.split(EOL);

    contentBlocks.forEach((element, index) => {

        if (element.startsWith(':')) {

            let newDefList = element.substr(2, element.length - 2).replace(EOL, '');
            let maxLineLength = process.stdout.columns - leftIndent;

            // console.log(newDefList.length);
            let indent = " ".repeat(leftIndent);

            let fill2end = process.stdout.columns - newDefList.length;
            let lineCount = Math.ceil(newDefList.length / process.stdout.columns);


            let words = newDefList.replace(EOL, " ").split(" ");

            let formattedLines = [indent];
            let line = "";
            let lineIndex = 0;

            console.log('------------------------------------');
            console.log("leftIndent", leftIndent);
            console.log(words);
            console.log("formattedLines", formattedLines);
            console.log('------------------------------------');



            // words.forEach(currentWord => {

            //     if (formattedLines[lineIndex].length + currentWord.length < maxLineLength) {

            //         // if (formattedLines[lineIndex].length === 0) {

            //         //     formattedLines[lineIndex] += indent + currentWord;

            //         // } else {

            //         formattedLines[lineIndex] += " " + currentWord;

            //         // }

            //     } else {

            //         console.log(lineIndex = formattedLines[lineIndex].length,
            //             "\n",
            //             formattedLines[lineIndex]);

            //         lineIndex += 1;
            //         formattedLines[lineIndex] = "--------";
            //         // formattedLines[lineIndex] = "-"+indent + currentWord;

            //     }

            //     // console.log(formattedLines[lineIndex].length, formattedLines[lineIndex]);

            // })

            // // console.log("\n\n");
            // console.log('_-------------------_')
            // console.log(maxLineLength, process.stdout.columns);
            // console.log('Formatted Line:\n', formattedLines);
            // console.log('---------------------')

            // Only for debugging line length
            // console.log(lineCount,
            //     Math.ceil(lineCount),
            //     Math.ceil(lineCount) * process.stdout.columns,
            //     newDefList.length,
            //     (process.stdout.columns * (lineCount)) - newDefList.length);

            // I case line is longer than one line
            if (lineCount === 1) {
                fill2end = process.stdout.columns - newDefList.length;
            } else {
                fill2end = (process.stdout.columns * (lineCount)) - newDefList.length;
            }

            // contentBlocks[index] = indent + element.substr(2, element.length); // + " ".repeat(fill2end)+" @";
            // contentBlocks[index] = formattedLines.join(EOL);

        }

    });

    // console.log(contentBlocks);

    return contentBlocks.join(EOL);

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

    if (typeof this._theme === 'undefined') {

        _setTheme(defTheme);
    }

    content = content.replace(/\r\n/ig, '\n')

    try {
        // console.log('Add definiton List');
        content = _extMDInclude(content, filepath);
        content = _extPyMDown(content);
    } catch (e) {
        throw `Error in external file: ${e}`;
    }

    try {
        content = _removeImages(content, /\!\[(?<alttag>.*?)\]\((.*?) \"(.*?)\"\)/ig);
    } catch (e) {
        throw `Error in remove images: ${e}`;
    }

    try {
        // console.log('Add hyperlink');
        content = _addHyperlinks(content);
    } catch (e) {
        throw `Error in addHyperlinks: ${e}`;
    }

    // try {
    // console.log('Add definiton List');
    content = _addDefinitionList(content, this._theme.indents.definitionList);

    return "";
    // } catch (e) {
    //     throw `Error in addDefinitionList: ${e}`;
    // }


    try {
        // console.log('Inline code')
        content = _addInlineCode(content);
    } catch (e) {
        throw `Error in addInlineCode: ${e}`;
    }

    try {
        // console.log('Highlight code block');
        content = _highlightedCodeBlock(content);
    } catch (e) {
        throw `Error in Highlighted Code: ${e}`;
    }

    try {
        // console.log('Add Bold');
        content = _addBold(content);
    } catch (e) {
        throw `Error in addBold Code: ${e}`;
    }

    try {
        // console.log('Add Italic');
        content = _addItalic(content);
    } catch (e) {
        throw `Error in addItalic: ${e}`;
    }

    try {
        // console.log('Add strike throught');
        content = _addStrikeThrough(content);
    } catch (e) {
        throw `Error in addStrikeThrough: ${e}`;
    }

    try {
        // console.log('Add Headlines');
        content = _headlines(content);
    } catch (e) {
        throw `Error in headlines: ${e}`;
    }

    try {
        // console.log('Add block quote');
        content = _addBlockQuote(content, this._theme.indents.blockQuote);
    } catch (e) {
        throw `Error in headlines: ${e}`;
    }

    if (this._theme.admonitions.enabled !== undefined && this._theme.admonitions.enabled === true) {

        // try {

        content = _addAdmonitions(content,
            this._theme.admonitions.beforeIndent,
            this._theme.admonitions.afterIndent,
            this._theme.admonitions.titleIndent,
            this._theme.admonitions.useSafeColors);

        // } catch (e) {

        //     throw `Error in Admonitions: ${e}`;

        // }

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
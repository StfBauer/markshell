const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const defTheme = {
    headline: chalk.bold.keyword('yellow'),
    bold: chalk.bold.keyword('white'),
    italic: chalk.italic.keyword('white'),
    strikethrough: chalk.strikethrough,
    code: chalk.bgGray.white.bold,
    inlineCode: chalk.bgGray.white.bold,
    blockQuote: chalk.italic.bgMagentaBright.white.bold
}

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

const addBold = (content) => {
    return highlightText(content, /\*\*/ig, this._theme.bold);
}

const addItalic = (content) => {
    return highlightText(content, /\*/ig, this._theme.italic);
}
const addStrikeThrough = (content) => {
    return highlightText(content, /\~\~/ig, this._theme.strikethrough);
}

const addCode = (content) => {
    return codeBlock(content);
}

const addInlineCode = (content) => {
    return highlightText(content, /\`/ig, this._theme.inlineCode);
}

const _toConsole = (filepath) => {

    let content = fs.readFileSync(filepath).toString();

    console.log(typeof this._theme, typeof this._theme === 'undefined', defTheme);
    if(typeof this._theme === 'undefined'){
        _setTheme(defTheme);
    }

    content = addBold(content);
    content = addItalic(content);
    content = addStrikeThrough(content);
    content = addCode(content);
    content = addInlineCode(content);
    content = headlines(content);
    content = addBlockQuote(content);

    console.log(content);

}

const _setTheme = (customTheme) => {

    this._theme = customTheme;

}

const _getTheme = () => {
    return JSON.parse(JSON.stringify(defTheme));
}

module.exports = {
    getTheme: _getTheme,
    setTheme: _setTheme,
    toConsole: _toConsole
}
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const theme = {
    headline: chalk.bold.greenBright,
    bold: chalk.bold.greenBright,
    italic: chalk.italic.greenBright,
    strikethrough: chalk.strikethrough.greenBright,
    code: chalk.keyword('lime'),
    inlineCode: chalk.keyword('orange'),
    blockQuote: chalk.bgMagentaBright.white.bold
}

const filepath = path.join(process.cwd(), '/samples/test.md');

var content = fs.readFileSync(filepath).toString();

const highlightText = (content, regexMatch, colorFunction) => {
    var regex = new RegExp(regexMatch);
    var index = 0,
        result, counter = 1;
    var tokenIndex = [];

    var newText = content;

    while (result = regex.exec(content)) {

        tokenIndex.push(result.index);
        console.log(tokenIndex);

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
            newContent[index] = theme.headline(headLine.trim());
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
            newContent[index] = theme.code(headLine + (' '.repeat(process.stdout.columns - headLine.length)));

        }

    });

    return newContent.join('\n');
}

const addBlockQuote = (content, indentLeft = 3, indetRight = 3) => {

    let newContent = content.split('\n');
    var columns = process.stdout.columns - 4;
    let maxWordLength = columns - indentLeft - indetRight;

    console.log('Max Word Length', maxWordLength);

    newContent.forEach((line, index) => {

        if (line.startsWith('>')) {

            var quote = line.replace(/>/ig, '');

            var words = quote.split(' ');

            var newLine = '';
            var curLine = 0;

            words.forEach(element => {

                // console.log(
                //     maxWordLength,
                //     newLine.length + element.length,
                //     Math.floor(
                //         (newLine.length + element.length) / maxWordLength
                //     )
                // )

                var calcLine = Math.floor(
                    (newLine.length + element.length + 2) / maxWordLength
                );

                console.log("CALC :::: ",columns, maxWordLength, calcLine, newLine.length + element.length);
                // console.log('LINES ::: ', calcLine, curLine);

                if (curLine !== calcLine) {

                    // console.log(newLine.length + element.length > maxWordLength);

                    // if (newLine.length + element.length > maxWordLength) {
                    //     newLine += '\n';
                    // }

                    curLine = calcLine;

                    newLine += '\n' + element;

                } else {

                    newLine += element + ' ';

                }

            });

            var blockQuoteLines = newLine.split('\n');

            newContent[index] = "";
            console.log(blockQuoteLines);

            blockQuoteLines.forEach(line => {

                console.log(maxWordLength, line.trim().length);
                console.log(maxWordLength - line.trim().length);

                let fillUpRight = maxWordLength - line.trim().length;

                let fillUpString = fillUpRight > 0 ? " ".repeat(fillUpRight) : "";

                newContent[index] += " ".repeat(indentLeft) +
                    theme.blockQuote(
                        line.trim() + fillUpString
                    ) + "\n";

            })

        }

    });

    return newContent.join('\n');

}

const addBold = (content) => {
    return highlightText(content, /\*\*/ig, theme.bold);
}

const addItalic = (content) => {
    return highlightText(content, /\*/ig, theme.italic);
}
const addStrikeThrough = (content) => {
    return highlightText(content, /\~\~/ig, theme.strikethrough);
}

const addCode = (content) => {
    return codeBlock(content);
}

const addInlineCode = (content) => {
    return highlightText(content, /\`/ig, theme.inlineCode);
}

content = addBold(content);
content = addItalic(content);
content = addStrikeThrough(content);
content = addCode(content);
content = addInlineCode(content);
content = headlines(content);
content = addBlockQuote(content);

console.log(content);
// console.log(result);

// const contentLines = content.split('\n');

// console.log(contentLines.length);

// console.log('Columns', process.stdout.columns)

// contentLines.forEach(line => {
//     console.log(line);
//     if(line.startsWith('#')){

//     }
// })
const chalk = require('chalk');
const {
    Color
} = require('chalk');
const {
    off
} = require('process');

const formatBlock = {
    indent: {
        beforeIndent: 3,
        afterIndent: 0
    },
    abstract: {
        title: 'Abstract',
        style: chalk.bgHex('#448aff').bold,
        safeStyleBackground: chalk.bgBlue.bold
    },
    note: {
        title: 'Note',
        styleBackground: chalk.bgHex('#448aff').bold,
        safeStyleBackground: chalk.bgBlue.bold
    },
    info: {
        title: 'Info',
        style: chalk.bgHex('#00b0ff').bold,
        safeStyleBackground: chalk.bgBlueBright.bold
    },
    tip: {
        title: 'Tip',
        style: chalk.bgHex('#00bfa5').bold,
        safeStyleBackGround: chalk.bgCyan.bold
    },
    success: {
        title: 'Success',
        style: chalk.bgHex('#00c853').bold,
        safeStyleBackground: chalk.bgGreen.bold
    },
    question: {
        title: 'Question',
        style: chalk.bgHex('#64dd17').bold,
        safeStyleBackground: chalk.bgGreenBright.bold
    },
    warning: {
        title: 'Warning',
        style: chalk.bgHex('#ff9100').bold,
        safeStyleBackground: chalk.bgRed.bold
    },
    failure: {
        title: 'Failure',
        style: chalk.bgHex('#ff5252').bold,
        safeStyleBackground: chalk.bgRedBright.bold
    },
    danger: {
        title: 'Danger',
        style: chalk.bgHex('#ff1744').bold,
        safeStyleBackground: chalk.bgRedBright.bold
    },
    important: {
        title: 'Important',
        style: chalk.bgHex('#ff1744').bold,
        safeStyleBackground: chalk.bgRedBright.bold
    },
    bug: {
        title: 'Bug',
        style: chalk.bgHex('#f50057').bold,
        safeStyleBackground: chalk.bgMagenta.bold
    },
    example: {
        title: 'Example',
        style: chalk.bgHex('#651fff').bold,
        safeStyleBackground: chalk.bgMagenta.bold
    },
    quote: {
        title: 'Quote',
        style: chalk.bgHex('#9e9e9e').bold,
        safeStyleBackground: chalk.bgGray.bold
    }
}

const offset = () => {

    return (formatBlock.indent.beforeIndent * 2) + 2 + formatBlock.indent.afterIndent;

}

const formatOutput = (title, style) => {

    return " ".repeat(formatBlock.indent.beforeIndent) +
        style(" ".repeat(formatBlock.indent.beforeIndent)) +
        chalk.bgHex('#000').white(" " + title + " ") +
        style(" ".repeat(process.stdout.columns - offset() - title.length)) +
        chalk.bgHex('#000')(" ".repeat(formatBlock.indent.afterIndent)) +
        "\n";
}

const _getBlocks = (content, beforeIndent, afterIndent) => {

    let regExp = new RegExp(/!!!(.*?)\n/ig);

    let admonitBlocks = content.match(regExp);

    if (admonitBlocks === null) {
        return null;
    }

    if(beforeIndent !== undefined && beforeIndent !== null){
        formatBlock.indent.beforeIndent = beforeIndent;
    } 
    
    if(afterIndent !== undefined && afterIndent !== null){
        formatBlock.indent.after = afterIndent
    }

    admonitBlocks.forEach(block => {

        block.trim();

        let definition = block.trim().split(' ');

        if (definition.length === 2) {

            let format = formatBlock[definition[1].toLowerCase()];

            if (format !== undefined) {

                content = content.replace(block, formatOutput(format.title, format.style));

            }

        } else {

            let titleJunks = [...definition];
            titleJunks.splice(0, 2);

            let title = titleJunks.join(' ');

            let format = formatBlock[definition[1]];

            title = title.replace(/\"/ig, '');

            content = content.replace(block, formatOutput(title, format.style));

        }

    });

    return content;

}


const _add = (content, beforeIdent, afterIndent) => {

    return _getBlocks(content, beforeIdent, afterIndent);

}



module.exports = {
    add: _add,
}
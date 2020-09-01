const chalk = require('chalk');
const {
    Color
} = require('chalk');
const {
    off
} = require('process');

const formatBlock = {
    indent: 3,
    abstract: {
        title: 'Abstract',
        style: chalk.bgHex('#448aff').hex('#fff').bold
    },
    note: {
        title: 'Note',
        style: chalk.bgHex('#448aff').hex('#fff').bold
    },
    info: {
        title: 'Info',
        style: chalk.bgHex('#00b0ff').hex('#fff').bold
    },
    tip: {
        title: 'Tip',
        style: chalk.bgHex('#00bfa5').hex('#fff').bold
    },
    success: {
        title: 'Success',
        style: chalk.bgHex('#00c853').hex('#fff').bold
    },
    question: {
        title: 'Question',
        style: chalk.bgHex('#64dd17').hex('#fff').bold
    },
    warning: {
        title: 'Warning',
        style: chalk.bgHex('#ff9100').hex('#fff').bold
    },
    failure: {
        title: 'Failure',
        style: chalk.bgHex('#ff5252').hex('#fff').bold
    },
    danger: {
        title: 'Danger',
        style: chalk.bgHex('#ff1744').hex('#fff').bold
    },
    important: {
        title: 'Important',
        style: chalk.bgHex('#ff1744').hex('#fff').bold
    },
    bug: {
        title: 'Bug',
        style: chalk.bgHex('#f50057').hex('#fff').bold
    },
    example: {
        title: 'Example',
        style: chalk.bgHex('#651fff').hex('#fff').bold
    },
    quote: {
        title: 'Quote',
        style: chalk.bgHex('#9e9e9e').hex('#fff').bold
    }
}


const offset = () => {
    return (formatBlock.indent * 2) + 2;
}

const formatOutput = (title, style) => {

    return " ".repeat(formatBlock.indent) +
        style(" ".repeat(formatBlock.indent)) +
        chalk.bgHex('#000').white(" " + title + " ") +
        style(" ".repeat(process.stdout.columns - offset() - title.length)) +
        "\n";


}

const _getBlocks = (content) => {

    let regExp = new RegExp(/!!!(.*?)\n/ig);

    let admonitBlocks = content.match(regExp);

    if (admonitBlocks === null) {
        return null;
    }

    admonitBlocks.forEach(block => {

        block.trim();

        let definition = block.trim().split(' ');

        if (definition.length === 2) {

            let format = formatBlock[definition[1].toLowerCase()];

            console.log(definition[1].toLowerCase());

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


const _add = (content) => {

    return _getBlocks(content);

}



module.exports = {
    add: _add
}
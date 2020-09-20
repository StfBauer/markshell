'use strict'

const chalk = require('chalk');
const {
    Color
} = require('chalk');
const {
    off
} = require('process');

let styles;

const defBeforeIndent = 3,
    defAfterIndent = 3,
    defTitleIndent = 3;

const formatBlock = {
    indent: {
        beforeIndent: defBeforeIndent,
        afterIndent: defAfterIndent,
        titleIndent: defTitleIndent,
    },
    abstract: {
        title: 'Abstract',
        style: chalk.bgHex('#448aff').bold,
        safeStyle: chalk.bgBlue.bold
    },
    note: {
        title: 'Note',
        style: chalk.bgHex('#448aff').bold,
        safeStyle: chalk.bgBlue.bold
    },
    info: {
        title: 'Info',
        style: chalk.bgHex('#00b0ff').bold,
        safeStyle: chalk.bgBlueBright.bold
    },
    tip: {
        title: 'Tip',
        style: chalk.bgHex('#00bfa5').bold,
        safeStyle: chalk.bgCyan.bold
    },
    success: {
        title: 'Success',
        style: chalk.bgHex('#00c853').bold,
        safeStyle: chalk.bgGreen.bold
    },
    question: {
        title: 'Question',
        style: chalk.bgHex('#64dd17').bold,
        safeStyle: chalk.bgGreenBright.bold
    },
    warning: {
        title: 'Warning',
        style: chalk.bgHex('#ff9100').bold,
        safeStyle: chalk.bgRed.bold
    },
    failure: {
        title: 'Failure',
        style: chalk.bgHex('#ff5252').bold,
        safeStyle: chalk.bgRedBright.bold
    },
    danger: {
        title: 'Danger',
        style: chalk.bgHex('#ff1744').bold,
        safeStyle: chalk.bgRedBright.bold
    },
    important: {
        title: 'Important',
        style: chalk.bgHex('#ff1744').bold,
        safeStyle: chalk.bgRedBright.bold
    },
    bug: {
        title: 'Bug',
        style: chalk.bgHex('#f50057').bold,
        safeStyle: chalk.bgMagenta.bold
    },
    example: {
        title: 'Example',
        style: chalk.bgHex('#651fff').bold,
        safeStyle: chalk.bgMagenta.bold
    },
    quote: {
        title: 'Quote',
        style: chalk.bgHex('#9e9e9e').bold,
        safeStyle: chalk.bgGray.bold
    }
}



const offset = () => {

    let offsetLength;

    // console.log(typeof this.styles.indent.beforeIndent, this.styles.indent.beforeIndent);
    // console.log(typeof this.styles.indent.afterIndent, this.styles.indent.afterIndent);
    // console.log(typeof this.styles.indent.titleIndent, this.styles.indent.titleIndent);

    offsetLength = (this.styles.indent.beforeIndent) + 2 + this.styles.indent.afterIndent + this.styles.indent.titleIndent;

    // console.log(process.stdout.columns < offsetLength, offsetLength);

    if (process.stdout.columns < offsetLength) {

        this.styles.indent.beforeIndent = defBeforeIndent;
        this.styles.indent.afterIndent = defAfterIndent;
        this.styles.indent.titleIndent = defTitleIndent;

        offsetLength = this.styles.indent.beforeIndent + 2 + this.styles.indent.afterIndent + this.styles.indent.titleIndent;

    }

    return offsetLength;

}

const formatOutput = (title, style) => {

    let indentOffset = offset();
    let outTitle = " " + title + " "

    if (this.styles.indent.beforeIndent === 0 && this.styles.indent.titleIndent === 0) {
        outTitle = title + " ";
    }

    return " ".repeat(this.styles.indent.beforeIndent) +
        style(" ".repeat(this.styles.indent.titleIndent)) +
        chalk.bgHex('#000').white(outTitle) +
        style(" ".repeat(process.stdout.columns - indentOffset - title.length)) +
        chalk.bgHex('#000')(" ".repeat(this.styles.indent.afterIndent)) +
        "\n";

}

const _getBlocks = (content, beforeIndent, afterIndent, titleIndent, useSafeStyles = false) => {

    let regExp = new RegExp(/!!!(.*?)\n/ig);

    let admonitBlocks = content.match(regExp);

    if (admonitBlocks === null) {
        return content;
    }

    if (beforeIndent !== undefined && beforeIndent !== null) {

        formatBlock.indent.beforeIndent = beforeIndent;

    }

    if (afterIndent !== undefined && afterIndent !== null) {

        formatBlock.indent.afterIndent = afterIndent

    }

    if (titleIndent !== undefined && titleIndent !== null) {

        formatBlock.indent.titleIndent = titleIndent

    }

    admonitBlocks.forEach(block => {

        let definition = block.trim().split(' ');

        if (definition.length === 2) {

            let format = formatBlock[definition[1].toLowerCase()];

            if (format === undefined) {
                format = formatBlock['info'];
                format.title = definition[1];
            }

            let style = format.style;

            if (useSafeStyles == true) {

                style = format.safeStyle;

            }

            let title = format.title;

            content = content.replace(block, formatOutput(title, style));

        } else {

            let titleJunks = [...definition];
            titleJunks.splice(0, 2);

            let title = titleJunks.join(' ');

            let format = formatBlock[definition[1]];

            if (format === undefined) {
                format = formatBlock['info'];
            }

            let style = format.style;

            if (useSafeStyles == true) {

                style = format.safeStyle;

            }

            title = title.replace(/\"/ig, '');

            content = content.replace(block, formatOutput(title, style));

        }

    });

    return content;

}

/**
 * return current and default styles
 */
const _getStyles = () => {

    if (this.styles === null || this.styles === undefined) {

        return formatBlock;

    } else {

        return this.styles;

    }

}

const _setStyles = (styleBlock) => {

    this.styles = styleBlock;

}


const _add = (content, beforeIdent, afterIndent, titleIndent, useSafeStyles = false) => {

    return _getBlocks(content, beforeIdent, afterIndent, titleIndent, useSafeStyles);

}

module.exports = {
    add: _add,
    getStyles: _getStyles,
    setStyles: _setStyles,
}
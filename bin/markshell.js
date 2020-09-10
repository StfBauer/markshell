#!/usr/bin/env node

const markshell = require('../lib'),
    fs = require('fs'),
    pkg = require('../package.json'),
    chalk = require('chalk');

const usage = './docs/usage.md';
    
const custTheme = markshell.getTheme();
markshell.setTheme(custTheme);

const [, , ...args] = process.argv;

const printError = (text = "") => {

    console.log(`Markshell  ${pkg.version}

${chalk.red.bold('ERROR: ')} ${text}

${markshell.toRawContent(usage)}
`);

}

const printHelp = () => {
    console.log(`Markshell - Version ${pkg.version}
\n${markshell.toRawContent(usage)}
`);
    process.exit(1);

}

if (args.length === 0 || args.indexOf('--help') !== -1) {
    printHelp();
}

const theme = args.indexOf('--theme');

if (theme !== 1) {

    if (args.length > theme + 1 && args[theme + 1].startsWith('-') === false) {

        switch (args[theme + 1].toLowerCase()) {
            case 'amber':
                console.log('Selected amber theme');
                break;
            case 'lime':
                console.log('Selected amber theme');
                break;
            case 'default':
                console.log('Selected default theme');
                break;

        }

    } else {
        printError("Name of theme option is missing use: amber, lime, or default");
    }

};

if (args.length === 1) {

    try {
        markshell.toRawContent(args[0]);
    } catch (e) {
        printError(e);
    }

}
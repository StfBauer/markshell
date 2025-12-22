#!/usr/bin/env node

const markshell = require('../lib'),
    fs = require('fs'),
    //@ts-ignore
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

// Handle --example flag to run interactive demos
const exampleIdx = args.indexOf('--example');
if (exampleIdx !== -1) {
    const path = require('path');
    const exampleName = args[exampleIdx + 1];

    const examples = {
        'dynamic-loading': path.join(__dirname, '../examples/dynamic-loading-demo.js'),
        'syntax-colors': path.join(__dirname, '../examples/syntax-colors-demo.js'),
        'demo': path.join(__dirname, '../DEMO.md')
    };

    if (!exampleName || !examples[exampleName]) {
        console.log(`Markshell - Version ${pkg.version}

${chalk.yellow.bold('Available examples:')}

  ${chalk.cyan('markshell --example dynamic-loading')}
    Interactive demo showing dynamic language loading with statistics

  ${chalk.cyan('markshell --example syntax-colors')}
    Visual demonstration of syntax highlighting colors

  ${chalk.cyan('markshell --example demo')}
    Comprehensive demo showcasing all markdown features and 25+ languages
`);
        process.exit(0);
    }

    const examplePath = examples[exampleName];

    if (exampleName === 'demo') {
        // Render the DEMO.md file
        try {
            markshell.toConsole(examplePath);
        } catch (e) {
            printError(e);
        }
    } else {
        // Execute the example script
        require(examplePath);
    }
    process.exit(0);
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
        markshell.toConsole(args[0]);
    } catch (e) {
        printError(e);
    }

}
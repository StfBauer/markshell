const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const markshell = require(process.cwd() + '/lib/index');

// // get default theme
// var theme =  markshell.getTheme();

// // define headline format
// theme.headline = chalk.bold.keyword('yellow'),

// // define bold text layout
// theme.bold = chalk.magenta,

// // define italic text
// theme.italic = chalk.italic.green;

// // define strikethrough style
// theme.strikethrough = chalk.strikethrough.redBright;

// // define code output
// theme.code = chalk.bold.whiteBright,

// // define inline code output
// theme.inlineCode = chalk.bold.keyword('lightblue'),

// // define blockquote style
// theme.blockQuote = chalk.bold.keyword('pink');

const pathToFile = path.join(__dirname,
    '../samples/test.md'
);

console.log('Trying to get file :::', pathToFile);
console.log('');

if (fs.existsSync(pathToFile)) {

    // set the output theme
    // markshell.setTheme(theme);

    // print markdown file
    markshell.toConsole(pathToFile);

};
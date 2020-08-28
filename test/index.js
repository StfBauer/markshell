const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const markshell = require(process.cwd() + '/lib/index');

// get default theme
var theme =  markshell.getTheme();
// theme.sourceCodeTheme = theme.availableSourceThemes.TOMORROW;
// console.log(theme.allThemes);

// console.log(Object.keys(theme));
// console.log(theme);


// define headline format
// theme.headline = chalk.bold.keyword('lime');

// // define bold text layout
// // theme.bold = chalk.bold.keyword('white');

// // define italic text
// theme.italic = chalk.italic.green;

// // define strikethrough style
// theme.strikethrough = chalk.strikethrough.redBright;

// // define code output
// theme.code = chalk.bold.whiteBright;

// // define inline code output
// theme.inlineCode = chalk.bold.keyword('lightblue'),

// // define blockquote style
// theme.blockQuote = chalk.bold.keyword('pink');

// console.log(theme.sourceCodeTheme);

// const pathToFile = path.join(__dirname,
//     '../samples/test.md'
// );

// console.log('Trying to get file :::', pathToFile);
// console.log('');
// // console.log(theme.availableSourceThemes);

// if (fs.existsSync(pathToFile)) {

//     // set the output theme
//     markshell.setTheme(theme);

//     // print markdown file
//     markshell.toConsole(pathToFile);
//     var moses = markshell.toRawContent(pathToFile);

// };


const pathToFile2 = path.join(__dirname,
    '../samples/sample.md'
);

console.log('Trying to get file :::', pathToFile2);
console.log('');
// console.log(theme.availableSourceThemes);

if (fs.existsSync(pathToFile2)) {

    // set the output theme
    markshell.setTheme(theme);

    // print markdown file
    markshell.toConsole(pathToFile2);
    // var moses = markshell.toRawContent(pathToFile2);

};
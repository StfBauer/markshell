console.log('/---/// TESTING DESIGN');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const markshell = require(process.cwd() + '/lib/index');

const outputFile = (file) => {

    const pathToFile = path.join(__dirname,
        file
    );

    console.log('Trying to get file :::', pathToFile);
    console.log('/---/// TESTING DESIGN');
    console.log('');
    console.log('/---/// OUTPUT');

    if (fs.existsSync(pathToFile)) {

        // set the output theme
        markshell.setTheme(theme);

        // print markdown file
        var rawOutput = markshell.toRawContent(pathToFile);

        console.log(rawOutput);

    } else {

        console.log(
            `File ${pathToFile} does not exist`
        );

    }

}

// get default theme
var theme = markshell.getTheme();

var styles = theme.admonitions.getStyles();
styles.indent.beforeIndent = 1;
styles.indent.afterIndent = 3;
styles.indent.titleIndent = 2;

theme.admonitions.setStyles(styles);
console.log(theme.indents);

theme.indents.definitionList = 2;

// styles.abstract.style = chalk.bgCyanBright.bold;
// styles.note.style = chalk.bgCyanBright.bold;
// styles.info.style = chalk.bgCyanBright.bold;
// styles.tip.style = chalk.bgCyanBright.bold;
// styles.success.style = chalk.bgCyanBright.bold;
// styles.success.style = chalk.bgCyanBright.bold;
// styles.warning.style = chalk.bgCyanBright.bold;
// styles.failure.style = chalk.bgCyanBright.bold;
// styles.danger.style = chalk.bgCyanBright.bold;
// styles.question.style = chalk.bgCyanBright.bold;
// styles.herbert = {
//     title: "Herbert",
//     style: chalk.bgCyanBright.bold,
//     safeStyle: chalk.bgCyanBright.bold
// };


// theme.admonitions.useSafeColors = true;

// console.log("::::: theme.admonitions.getStyles() :::::");
// console.log(theme.admonitions.getStyles());
// console.log("::::: theme.admonitions.getStyles() :::::");
theme.sourceCodeTheme = theme.availableSourceThemes.TOMORROW;
// console.log(theme.allThemes);

// const theme = markshell.getTheme();
// theme.sourceCodeTheme = theme.availableSourceThemes.FUNKY;
markshell.setTheme(theme);

// console.log(Object.keys(theme));
// console.log(theme);

// theme.indents.definitionList = 0;
theme.indents.blockquote = 10;


// define headline format
theme.headline = chalk.bold.keyword('lime');

// define bold text layout
theme.bold = chalk.bold.keyword('white');

// define italic text
theme.italic = chalk.italic.green;

// define strikethrough style
theme.strikethrough = chalk.strikethrough.redBright;

// define code output
theme.code = chalk.bold.keyword('lime');

// define inline code output
theme.inlineCode = chalk.bold.keyword('lightblue');

// define blockquote style
theme.blockQuote = chalk.bold.keyword('pink');
theme.useAdmonitions = true;

theme.includePath = path.join(__dirname, '../samples/');

// console.log(theme.includePath);
// outputFile('../samples/sample.md');
// theme.sourceCodeTheme = theme.availableSourceThemes.SOLARIZE;
// markshell.setTheme(theme);
// outputFile('../samples/sp-add-site.md');
// theme.sourceCodeTheme = theme.availableSourceThemes.OKAIDIA;
// markshell.setTheme(theme);
// outputFile('../samples/test.md');
// outputFile('../samples/admonitions.md');
// outputFile('../samples/w32.md');
// outputFile('../samples/another-readme.md');
// outputFile('../samples/new-single-sample.md');
// outputFile('../samples/login.md');
// outputFile('../samples/site-list.md');
// outputFile('../samples/bug-samples.md');
outputFile('../samples/spo-get.md');
console.log('/---/// OUTPUT');
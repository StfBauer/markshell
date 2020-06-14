# Markshell - Console output for Markdown

Markshell let you output any [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) file to the console. This tool also includes theming support to change the out put to your favorite colors.

Syntax hightlighting support for source code on the console is provided base on [PrismJS](https://prismjs.com)

The output on the console then looks like this:

![Sample Console Output][markshell]

This package uses [Chalk](https://www.npmjs.com/package/chalk) for coloring the output.

## Install

```shell
npm install markshell --save
```

## Usage

To use Markshell in your CLI code use something like this.

```javascript
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const markshell = require('markshell');

const pathToFile = path.join(__dirname,
    'path to my markdown file'
);

if (fs.existsSync(pathToFile)) {

    // print markdown file
    markshell.toConsole(pathToFile);

};
```

## Theme

Setting theme for the console can be accomplished with the following code.

```javascript
// get the default theme
const theme = markshell.getTheme();
```

Gives you the default themeing define in the package. the following theming slots are available.

```javascript
// define headline format
theme.headline = chalk.bold.keyword('lime'),

// define bold text layout
theme.bold = chalk.bold.lime,

// define italic text
theme.italic = chalk.italic.keyword('lime');

// define strikethrough style
theme.strikethrough = chalk.strikethrough.keyword('lime');

// define code output
theme.code = chalk.bold.keyword('lime'),

// define inline code output
theme.inlineCode = chalk.bold.keyword('lime'),

// define blockquote style
theme.blockQuote = chalk.italic.bgKeyword('lime').keyword('black');
```

Finally set the new theme for the output.

```javascript
markshell.setTheme(theme);
```

The output should then transformed into this:

![Themed markshell output][themed-markshell]

For full color reference check out: [Chalk](https://www.npmjs.com/package/chalk) 

### Output raw content

I case you like to work with the raw formatted content.

```javascript
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const markshell = require('markshell');

const pathToFile = path.join(__dirname,
    'path to my markdown file'
);

if (fs.existsSync(pathToFile)) {

    // Get the formatted content
   var formattedContent = markshell.toRawConsole(pathToFile);

   ...

};
```

Have fun using it!!! 🖤🖤🖤

[markshell]: https://n8d.at/wp-content/uploads/2020/06/console-output.png
[themed-markshell]: https://n8d.at/wp-content/uploads/2020/06/themed-console-output.png

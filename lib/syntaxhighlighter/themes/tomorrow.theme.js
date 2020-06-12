/**
 * okaidia theme for JavaScript"] CSS and HTML
 * Loosely based on Monokai textmate theme by http://www.monokai.nl/
 * @author ocodia
 * modified by Stefan Bauer for use in JavaScript
 */

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgHex('#2d2d2d')

theme.backgroundAlt = theme.background; // probably unused.
theme.toEOL = theme.background;;
theme.inlineSpace = theme.background;

theme.token["comment"] = chalk.hex('#999');
theme.token["prolog"] = chalk.hex('#999');
theme.token["doctype"] = chalk.hex('#999');
theme.token["cdata"] = chalk.hex('#999');

theme.token["punctuation"] = chalk.hex("#ccc");

theme.token["namespace"] = chalk.hex('#e2777a');

theme.token["property"] = chalk.hex('#f8c555');
theme.token["tag"] = chalk.hex('#e2777a');
theme.token["constant"] = chalk.hex('#f8c555');
theme.token["symbol"] = chalk.hex('#f8c555');
theme.token["deleted"] = chalk.hex('#e2777a');

theme.token["boolean"] = chalk.hex("#ae81ff");
theme.token["number"] = chalk.hex("#ae81ff");

theme.token["selector"] = chalk.hex("#cc99cd");
theme.token["attr-name"] = chalk.hex("#a6e22e");
theme.token["string"] = chalk.hex("#7ec699");
theme.token["char"] = chalk.hex("#7ec699");
theme.token["builtin"] = chalk.hex("#cc99cd");
theme.token["inserted"] = chalk.hex("#a6e22e");

theme.token["operator"] = chalk.hex("#67cdcc")
theme.token["entity"] = chalk.hex("#67cdcc")
theme.token["url"] = chalk.hex("#67cdcc")
theme.token["variable"] = chalk.hex("#7ec699");


theme.token["atrule"] = chalk.hex('#cc99cd');
theme.token["attr-value"] = chalk.hex('#7ec699');
theme.token["function"] = chalk.hex('#f08d49');
theme.token["function-name"] = chalk.hex('#6196cc');
theme.token["class-name"] = chalk.hex('#f8c555');

theme.token["keyword"] = chalk.hex('#cc99cd');

theme.token["regex"] = chalk.hex("#7ec699");
theme.token["important"] = chalk.hex("#fd971f");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
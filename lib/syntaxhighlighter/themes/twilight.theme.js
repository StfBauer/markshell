/**
 * prism.js Twilight theme
 * Based (more or less) on the Twilight theme originally of Textmate fame.
 * @author Remy Bach
 */
'use strict';

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgHsl(0, 0, 8);

theme.backgroundAlt = theme.background; // probably unused.
theme.toEOL = theme.background;;
theme.inlineSpace = theme.background;

theme.token["comment"] = chalk.hsl(0, 0, 47);
theme.token["prolog"] = chalk.hsl(0, 0, 47);
theme.token["doctype"] = chalk.hsl(0, 0, 47);
theme.token["cdata"] = chalk.hsl(0, 0, 47);

theme.token["punctuation"] = chalk.hsl(0, 0, 47);

theme.token["namespace"] = chalk.hsl(0, 0, 47);

theme.token["property"] = chalk.hsl(53, 89, 79);
theme.token["tag"] = chalk.hex('#f92672');
theme.token["constant"] = chalk.hsl(53, 89, 79);
theme.token["symbol"] = chalk.hsl(53, 89, 79);
theme.token["deleted"] = chalk.hex('#f92672');

theme.token["boolean"] = chalk.hex("#ae81ff");
theme.token["number"] = chalk.hex("#ae81ff");

theme.token["selector"] = chalk.hsl(53, 89, 79);
theme.token["attr-name"] = chalk.hex("#a6e22e");
theme.token["string"] = chalk.hsl(76, 21, 52);
theme.token["char"] = chalk.hsl(76, 21, 52);;
theme.token["builtin"] = chalk.hsl(53, 89, 79);
theme.token["inserted"] = chalk.hex("#a6e22e");

theme.token["operator"] = chalk.hsl(76, 21, 52);
theme.token["entity"] = chalk.hsl(76, 21, 52);
theme.token["url"] = chalk.hsl(76, 21, 52);
theme.token["variable"] = chalk.hsl(76, 21, 52);;


theme.token["atrule"] = chalk.hsl(218, 22, 55);
theme.token["attr-value"] = chalk.hsl(76, 21, 52);
theme.token["function"] = chalk.hex('#e6db74'); // not defined
theme.token["class-name"] = chalk.hex('#e6db74'); // not define

theme.token["keyword"] = chalk.hsl(53, 89, 79);

theme.token["regex"] = chalk.hsl(42, 75, 65);
theme.token["important"] = chalk.hsl(42, 75, 65);

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
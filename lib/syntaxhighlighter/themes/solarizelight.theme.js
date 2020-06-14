/*
 Solarized Color Schemes originally by Ethan Schoonover
 http://ethanschoonover.com/solarized

 Ported for PrismJS by Hector Matos
 Website: https://krakendev.io
 Twitter Handle: https://twitter.com/allonsykraken)
*/
'use strict';

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgHex('#fdf6e3').hex('#657b83');

theme.backgroundAlt = theme.background; // probably unused.
theme.toEOL = theme.background;;
theme.inlineSpace = theme.background;

theme.token["comment"] = chalk.hex('#93a1a1');
theme.token["prolog"] = chalk.hex('#93a1a1');
theme.token["doctype"] = chalk.hex('#93a1a1');
theme.token["cdata"] = chalk.hex('#93a1a1');

theme.token["punctuation"] = chalk.hex("#586e75");

theme.token["namespace"];

theme.token["property"] = chalk.hex('#268bd2');
theme.token["tag"] = chalk.hex('#268bd2');
theme.token["constant"] = chalk.hex('#268bd2');
theme.token["symbol"] = chalk.hex('#268bd2');
theme.token["deleted"] = chalk.hex('#268bd2');

theme.token["boolean"] = chalk.hex("#268bd2");
theme.token["number"] = chalk.hex("#268bd2");

theme.token["selector"] = chalk.hex("#2aa198");
theme.token["attr-name"] = chalk.hex("#2aa198");
theme.token["string"] = chalk.hex("#2aa198");
theme.token["char"] = chalk.hex("#2aa198");
theme.token["builtin"] = chalk.hex("#2aa198");
theme.token["inserted"] = chalk.hex("#2aa198");

theme.token["operator"] = chalk.hex("#f8f8f2");
theme.token["entity"] = chalk.bgHex('#eee8d5');
theme.token["url"] = chalk.hex("#f8f8f2")
theme.token["variable"] = chalk.hex("#cb4b16");


theme.token["atrule"] = chalk.hex('#859900');
theme.token["attr-value"] = chalk.hex('#859900');
theme.token["function"] = chalk.hex('#b58900');
theme.token["class-name"] = chalk.hex('#b58900');

theme.token["keyword"] = chalk.hex('#859900');

theme.token["regex"] = chalk.hex("#cb4b16");
theme.token["important"] = chalk.hex("#cb4b16");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
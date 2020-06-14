/**
 * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);
 * original @author Tim Shedor
 * @author Stefan Bauer
 */
'use strict';

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgHex('#fdfdfd');

theme.backgroundAlt = theme.background; // probably unused.
theme.toEOL = theme.background;;
theme.inlineSpace = theme.background;

theme.token["comment"] = chalk.bgHex('#7D8B99');
theme.token["prolog"] = chalk.bgHex('#7D8B99');
theme.token["doctype"] = chalk.bgHex('#7D8B99');
theme.token["cdata"] = chalk.bgHex('#7D8B99');

theme.token["punctuation"] = chalk.hex("#5F6364");

theme.token["namespace"];

theme.token["property"] = chalk.hex('#c92c2c');
theme.token["tag"] = chalk.hex('#c92c2c');
theme.token["constant"] = chalk.hex('#c92c2c');
theme.token["symbol"] = chalk.hex('#c92c2c');
theme.token["deleted"] = chalk.hex('#c92c2c');

theme.token["boolean"] = chalk.hex("#c92c2c");
theme.token["number"] = chalk.hex("#c92c2c");

theme.token["selector"] = chalk.hex("#2f9c0a");
theme.token["attr-name"] = chalk.hex("#2f9c0a");
theme.token["string"] = chalk.hex("#a67f59");
theme.token["char"] = chalk.hex("#2f9c0a");
theme.token["builtin"] = chalk.hex("#2f9c0a");
theme.token["inserted"] = chalk.hex("#2f9c0a");

theme.token["operator"] = chalk.hex("#a67f59")
theme.token["entity"] = chalk.hex("#a67f59")
theme.token["url"] = chalk.hex("#a67f59")
theme.token["variable"] = chalk.hex("#a67f59");


theme.token["atrule"] = chalk.hex('#1990b8');
theme.token["attr-value"] = chalk.hex('#1990b8');
theme.token["function"] = chalk.hex('#2f9c0a');
theme.token["class-name"] = chalk.hex('#1990b8');

theme.token["keyword"] = chalk.hex('#1990b8');

theme.token["regex"] = chalk.hex("#e90");
theme.token["important"] = chalk.hex("#e90");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
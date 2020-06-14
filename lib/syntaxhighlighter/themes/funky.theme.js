/**
 * okaidia theme for JavaScript"] CSS and HTML
 * Loosely based on Monokai textmate theme by http://www.monokai.nl/
 * @author ocodia
 * modified by Stefan Bauer for use in JavaScript
 */
'use strict';

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgKeyword('white');
theme.backgroundAlt = chalk.bgKeyword('white'); // probably unused.
theme.toEOL = chalk.bgKeyword('white');
theme.inlineSpace = chalk.bgKeyword('black');

theme.token["comment"] = chalk.bgKeyword('black').hex('#aaa');
theme.token["prolog"] = chalk.bgKeyword('black').hex('#aaa');
theme.token["doctype"] = chalk.bgKeyword('black').hex('#aaa');
theme.token["cdata"] = chalk.bgKeyword('black').hex('#aaa');

theme.token["punctuation"] = chalk.bgKeyword('black').hex("#999");

theme.token["namespace"];

theme.token["property"] = chalk.bgKeyword('black').hex('#0cf');
theme.token["tag"] = chalk.bgKeyword('black').hex('#0cf');
theme.token["constant"] = chalk.bgKeyword('black').hex('#0cf');
theme.token["symbol"] = chalk.bgKeyword('black').hex('#0cf');
theme.token["deleted"] = chalk.bgKeyword('black').hex('#0cf');

theme.token["boolean"] = chalk.bgKeyword('black').hex("#0cf");
theme.token["number"] = chalk.bgKeyword('black').hex("#0cf");

theme.token["selector"] = chalk.bgKeyword('black').keyword('yellow');
theme.token["attr-name"] = chalk.bgKeyword('black').keyword('yellow');
theme.token["string"] = chalk.bgKeyword('black').keyword('yellow');
theme.token["char"] = chalk.bgKeyword('black').keyword('yellow');
theme.token["builtin"] = chalk.bgKeyword('black').keyword('yellow');
theme.token["inserted"] = chalk.bgKeyword('black').keyword('yellow');

theme.token["operator"] = chalk.bgKeyword('black').keyword('yellowgreen');
theme.token["entity"] = chalk.bgKeyword('black').keyword('yellowgreen');
theme.token["url"] = chalk.bgKeyword('black').keyword('yellowgreen');
theme.token["variable"] = chalk.bgKeyword('black').keyword('yellowgreen');


theme.token["atrule"] = chalk.bgKeyword('black').keyword('deeppink');
theme.token["attr-value"] = chalk.bgKeyword('black').keyword('deeppink');
theme.token["function"] = chalk.bgKeyword('black').keyword('deeppink');
theme.token["class-name"] = chalk.bgKeyword('black').keyword('yellow');

theme.token["keyword"] = chalk.bgKeyword('black').keyword('deeppink');

theme.token["regex"] = chalk.bgKeyword('black').keyword('orange');
theme.token["important"] = chalk.bgKeyword('black').keyword('orange');

theme.token["bold"] = chalk.bgKeyword('black').bold;

theme.token["italic"] = chalk.bgKeyword('black').italic;

module.exports = theme;
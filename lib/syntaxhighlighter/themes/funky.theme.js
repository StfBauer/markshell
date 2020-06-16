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

theme.background = chalk.bgKeyword('black');
theme.backgroundAlt = chalk.bgKeyword('black'); // probably unused.
theme.toEOL = chalk.bgKeyword('white');
theme.inlineSpace = chalk.bgKeyword('black');

theme.token["comment"] = chalk.hex('#aaa');
theme.token["prolog"] = chalk.hex('#aaa');
theme.token["doctype"] = chalk.hex('#aaa');
theme.token["cdata"] = chalk.hex('#aaa');

theme.token["punctuation"] = chalk.hex("#999");

theme.token["namespace"];

theme.token["property"] = chalk.hex('#0cf');
theme.token["tag"] = chalk.hex('#0cf');
theme.token["constant"] = chalk.hex('#0cf');
theme.token["symbol"] = chalk.hex('#0cf');
theme.token["deleted"] = chalk.hex('#0cf');

theme.token["boolean"] = chalk.hex("#0cf");
theme.token["number"] = chalk.hex("#0cf");

theme.token["selector"] = chalk.keyword('yellow');
theme.token["attr-name"] = chalk.keyword('yellow');
theme.token["string"] = chalk.keyword('yellow');
theme.token["char"] = chalk.keyword('yellow');
theme.token["builtin"] = chalk.keyword('yellow');
theme.token["inserted"] = chalk.keyword('yellow');

theme.token["operator"] = chalk.keyword('yellowgreen');
theme.token["entity"] = chalk.keyword('yellowgreen');
theme.token["url"] = chalk.keyword('yellowgreen');
theme.token["variable"] = chalk.keyword('yellowgreen');


theme.token["atrule"] = chalk.keyword('deeppink');
theme.token["attr-value"] = chalk.keyword('deeppink');
theme.token["function"] = chalk.keyword('deeppink');
theme.token["class-name"] = chalk.keyword('yellow');

theme.token["keyword"] = chalk.keyword('deeppink');

theme.token["regex"] = chalk.keyword('orange');
theme.token["important"] = chalk.keyword('orange');

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
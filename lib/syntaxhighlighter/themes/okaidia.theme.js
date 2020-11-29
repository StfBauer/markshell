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

theme.background = chalk.bgHex('#272822');
theme.backgroundAlt = chalk.bgHex('#272822'); // probably unused.
theme.toEOL = chalk.bgHex('#272822');;
theme.inlineSpace = chalk.bgHex('#272822');


theme.token["comment"] = chalk.bgHex('#272822').keyword('slategray');
theme.token["prolog"] = chalk.bgHex('#272822').keyword('slategray');
theme.token["doctype"] = chalk.bgHex('#272822').keyword('slategray');
theme.token["cdata"] = chalk.bgHex('#272822').keyword('slategray');

theme.token["punctuation"] = chalk.bgHex('#272822').hex("#f8f8f2");

theme.token["namespace"];

theme.token["property"] = chalk.bgHex('#272822').hex('#f92672');
theme.token["tag"] = chalk.bgHex('#272822').hex('#f92672');
theme.token["constant"] = chalk.bgHex('#272822').hex('#f92672');
theme.token["symbol"] = chalk.bgHex('#272822').hex('#f92672');
theme.token["deleted"] = chalk.bgHex('#272822').hex('#f92672');

theme.token["boolean"] = chalk.bgHex('#272822').hex("#ae81ff");
theme.token["number"] = chalk.bgHex('#272822').hex("#ae81ff");

theme.token["selector"] = chalk.bgHex('#272822').hex("#a6e22e");
theme.token["attr-name"] = chalk.bgHex('#272822').hex("#a6e22e");
theme.token["string"] = chalk.bgHex('#272822').hex("#a6e22e");
theme.token["char"] = chalk.bgHex('#272822').hex("#a6e22e");
theme.token["builtin"] = chalk.bgHex('#272822').hex("#a6e22e");
theme.token["inserted"] = chalk.bgHex('#272822').hex("#a6e22e");

theme.token["operator"] = chalk.bgHex('#272822').hex("#f8f8f2")
theme.token["entity"] = chalk.bgHex('#272822').hex("#f8f8f2")
theme.token["url"] = chalk.bgHex('#272822').hex("#f8f8f2")
theme.token["variable"] = chalk.bgHex('#272822').hex("#f8f8f2");


theme.token["atrule"] = chalk.bgHex('#272822').hex('#e6db74');
theme.token["attr-value"] = chalk.bgHex('#272822').hex('#e6db74');
theme.token["function"] = chalk.bgHex('#272822').hex('#e6db74');
theme.token["class-name"] = chalk.bgHex('#272822').hex('#e6db74');

theme.token["keyword"] = chalk.bgHex('#272822').hex('#66d9ef');

theme.token["regex"] = chalk.bgHex('#272822').hex("#fd971f");
theme.token["important"] = chalk.bgHex('#272822').hex("#fd971f");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
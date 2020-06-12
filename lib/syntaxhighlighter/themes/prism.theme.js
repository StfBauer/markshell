/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * original @author Lea Verou
 * Adopted by @author Stefan Bauer
 */

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgHex("#f5dfd0");

theme.backgroundAlt = theme.background; // probably unused.
theme.toEOL = theme.background;;
theme.inlineSpace = theme.background;

theme.token["comment"] = theme.background.keyword('slategray');
theme.token["prolog"] = theme.background.keyword('slategray');
theme.token["doctype"] = theme.background.keyword('slategray');
theme.token["cdata"] = theme.background.keyword('slategray');

theme.token["punctuation"] = theme.background.hex("#999");

theme.token["namespace"];

theme.token["property"] = theme.background.hex('#905');
theme.token["tag"] = theme.background.hex('#905');
theme.token["constant"] = theme.background.hex('#905');
theme.token["symbol"] = theme.background.hex('#905');
theme.token["deleted"] = theme.background.hex('#905');

theme.token["boolean"] = theme.background.hex("#905");
theme.token["number"] = theme.background.hex("#905");

theme.token["selector"] = theme.background.hex("#690");
theme.token["attr-name"] = theme.background.hex("#690");
theme.token["string"] = theme.background.hex("#690");
theme.token["char"] = theme.background.hex("#690");
theme.token["builtin"] = theme.background.hex("#690");
theme.token["inserted"] = theme.background.hex("#690");

theme.token["operator"] = theme.background.hex("#9a6e3a")
theme.token["entity"] = theme.background.hex("#9a6e3a")
theme.token["url"] = theme.background.hex("#9a6e3a")
theme.token["variable"] = theme.background.hex("#e90");
theme.token["string"] = theme.background.hex("#9a6e3a");


theme.token["atrule"] = theme.background.hex('#07a');
theme.token["attr-value"] = theme.background.hex('#07a');
theme.token["function"] = theme.background.hex('#DD4A68');
theme.token["class-name"] = theme.background.hex('#DD4A68');

theme.token["keyword"] = theme.background.hex('#07a');

theme.token["regex"] = theme.background.hex("#e90");
theme.token["important"] = theme.background.hex("#e90");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
/**
 * prism.js Dark theme for JavaScript, CSS and HTML
 * Based on the slides of the talk “/Reg(exp){2}lained/”
 * original @author Lea Verou
 * adopted by @author Stefan Bauer
 */



const chalk = require("chalk");
const { magenta } = require("chalk");

var theme = {};
theme.token = {};

theme.background = chalk.bgRgb(122, 102, 82);
theme.backgroundAlt = chalk.bgHsl(30,20,25);
theme.toEOL = chalk.bgRgb(122, 102, 82);
theme.inlineSpace = chalk.bgRgb(122, 102, 82);

theme.token["comment"] = chalk.hsl(30,20,50);
theme.token["prolog"] = chalk.hsl(30,20,50);
theme.token["doctype"] = chalk.hsl(30,20,50);
theme.token["cdata"] = chalk.hsl(30,20,50);

theme.token["punctuation"] = chalk.keyword('white');

theme.token["namespace"];

theme.token["property"] = chalk.hsl(350,40,70);
theme.token["tag"] = chalk.hsl(350,40,70);
theme.token["constant"] = chalk.hsl(350,40,70);
theme.token["symbol"] = chalk.hsl(350,40,70);
theme.token["deleted"] = chalk.keyword('red');

theme.token["boolean"] = chalk.hsl(350,40,70);
theme.token["number"] = chalk.hsl(350,40,70);

theme.token["selector"] = chalk.rgb(189, 224, 82);
theme.token["attr-name"] = chalk.hsl(75,70,60);
theme.token["string"] = chalk.hsl(75,70,60);

theme.token["char"] = chalk.hsl(75,70,60);
theme.token["builtin"] = chalk.hsl(75,70,60);
theme.token["inserted"] = chalk.hsl(75,70,60);

theme.token["operator"] = chalk.hsl(40,90,60);
theme.token["entity"] = chalk.hsl(40,90,60);
theme.token["url"] = chalk.hsl(40,90,60);
theme.token["variable"] = chalk.hsl(40,90,60);

theme.token["atrule"] = chalk.hsl(350,40,70);
theme.token["attr-value"] = chalk.hsl(350,40,70);
theme.token["function"] = chalk.hex('#e6db74');
theme.token["class-name"] = chalk.hex('#e6db74');

theme.token["keyword"] = chalk.hsl(350,40,70);

theme.token["regex"] = chalk.hex("#e90");
theme.token["important"] = chalk.hex("#e90");

theme.token["bold"] = chalk.bold;

theme.token["italic"] = chalk.italic;

module.exports = theme;
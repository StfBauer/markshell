/**
 * okaidia theme for JavaScript"] CSS and HTML
 * Loosely based on Monokai textmate theme by http://www.monokai.nl/
 * @author ocodia
 */

const chalk = require("chalk");

var theme = {};
theme.token = {};

theme["token"]["comment"] = chalk.keyword('slategray');
theme["token"]["prolog"] = chalk.keyword('slategray');
theme["token"]["doctype"] = chalk.keyword('slategray');
theme["token"]["cdata"] = chalk.keyword('slategray');

theme["token"]["punctuation"] = chalk.hex("#f8f8f2");

theme["token"]["namespace"];

theme["token"]["property"] = chalk.hex('#f92672');
theme["token"]["tag"] = chalk.hex('#f92672');
theme["token"]["constant"] = chalk.hex('#f92672');
theme["token"]["symbol"] = chalk.hex('#f92672');
theme["token"]["deleted"] = chalk.hex('#f92672');

theme["token"]["boolean"] = chalk.hex("#ae81ff");
theme["token"]["number"] = chalk.hex("#ae81ff");

theme["token"]["selector"] = chalk.hex("#a6e22e");
theme["token"]["attr-name"] = chalk.hex("#a6e22e");
theme["token"]["string"] = chalk.hex("#a6e22e");
theme["token"]["char"] = chalk.hex("#a6e22e");
theme["token"]["builtin"] = chalk.hex("#a6e22e");
theme["token"]["inserted"] = chalk.hex("#a6e22e");

theme["token"]["operator"] = chalk.hex("#f8f8f2")
theme["token"]["entity"] = chalk.hex("#f8f8f2")
theme["token"]["url"] = chalk.hex("#f8f8f2")
theme["token"]["variable"] = chalk.hex("#f8f8f2");


theme["token"]["atrule"] = chalk.hex('#e6db74');
theme["token"]["attr-value"] = chalk.hex('#e6db74');
theme["token"]["function"] = chalk.hex('#e6db74');
theme["token"]["class-name"] = chalk.hex('#e6db74');

theme["token"]["keyword"] = chalk.hex('#66d9ef');

theme["token"]["regex"] = chalk.hex("#fd971f");
theme["token"]["important"] = chalk.hex("#fd971f");


theme["token"]["important"] = chalk.bold;
theme["token"]["bold"] = chalk.bold;

theme["token"]["italic"] = chalk.italic;

module.exports = theme;
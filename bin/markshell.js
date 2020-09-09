#!/usr/bin/env node

const markshell = require('../lib'),
    fs = require('fs'),
    pkg = require('../package.json');

console.log(pkg);

// const usage = './docs/usage.md';

// const [, , ...args] = process.argv;

// if (args.length === 0 || args.indexOf('--help') !== -1) {
//     console.log(`Markshell version ${pkg.version}
//     markshell.toRawContent(usage)
//     `;)
// }
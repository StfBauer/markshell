const prismjs = require('prismjs/prism');
const loadLanguages = require('prismjs/components/');
loadLanguages();
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

const theme = require('./okaido.style');

var code = `console.log('hello world');

var string = "how are you";
`;

// code = `
// <div class='helloworld'>
//     <span>I love coffee</span>
// </div>
// `

// code = `
// #!/usr/bin/env node

// global.log = require('./lib/logger');
// global.logVerbose = true;

// require('./caller/index')
// `

// code = `@import url(https://fonts.googleapis.com/css?family=Questrial);
// @import url(https://fonts.googleapis.com/css?family=Arvo);

// @font-face {
// 	src: url(https://lea.verou.me/logo.otf);
// 	font-family: 'LeaVerou';
// }

// /*
//  Shared styles
//  */

// section h1,
// #features li strong,
// header h2,
// footer p {
// 	font: 100% Rockwell, Arvo, serif;
// }`


console.log('document', )
console.log(Object.keys(Prism.languages));

const prismCode = prismjs.highlight(code, Prism.languages.javascript, 'javascript');

console.log(prismCode);

var prismLines = prismCode.split('\n');

const dom = JSDOM.fragment(prismCode);

let lineEncoded = "";

console.log('\n\n\n\n')

dom.childNodes.forEach((element, index) => {

    // console.log(index + '__________________________________________________________');
    // console.log(element.textContent);

    switch (element.nodeName) {
        case '#text':
            // console.log(element.textContent, element.classList);
            lineEncoded += element.textContent;
            break;
        case 'SPAN':
            // console.log('SPAN :::: ', element.textContent, element.classList, element.outerHTML);
            try {
                lineEncoded += theme[element.classList[0]][element.classList[1]](element.textContent);
            } catch (e) {
                console.log("Error",element.classList, theme[element.classList[0]][element.classList[1]]);
            }
            break;
    }

});

console.log(lineEncoded);
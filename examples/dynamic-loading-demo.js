#!/usr/bin/env node
/**
 * Interactive demonstration of dynamic PrismJS language loading
 * Shows syntax highlighting output AND loading statistics
 */

const path = require('path');
const markshell = require(path.join(__dirname, '../lib/index.js'));
const syntaxHighlighter = require(path.join(__dirname, '../lib/syntaxhighlighter'));
const fs = require('fs');

console.log('\n🎨 ===== SYNTAX HIGHLIGHTING DEMO WITH DYNAMIC LOADING =====\n');

// Show initial state
console.log('📊 Initial State:');
console.log('   Loaded languages:', syntaxHighlighter.getLoadedLanguagesInfo());
console.log('');

// Create a test file with multiple languages
const testContent = `# Code Examples

## JavaScript

\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## Python

\`\`\`py
def hello():
    print("Hello World")
\`\`\`

## Shell

\`\`\`sh
echo "Hello World"
ls -la
\`\`\`
`;

// Write test file
const testFile = '/tmp/markshell-test.md';
fs.writeFileSync(testFile, testContent);

console.log('📝 Rendering markdown with syntax highlighting...\n');
console.log('═'.repeat(80));

// Render the file (this will trigger dynamic loading)
const output = markshell.toConsole(testFile);

console.log('═'.repeat(80));
console.log('');

// Show what got loaded
console.log('📊 After Rendering:');
const info = syntaxHighlighter.getLoadedLanguagesInfo();
console.log('   Loaded languages:', info);
console.log(`   Total: ${info.count} languages loaded dynamically`);
console.log('');

// Test alias resolution
console.log('🔍 Language Alias Resolution Examples:');
console.log('   js  →', syntaxHighlighter.resolveLanguageAlias('js'));
console.log('   py  →', syntaxHighlighter.resolveLanguageAlias('py'));
console.log('   sh  →', syntaxHighlighter.resolveLanguageAlias('sh'));
console.log('   ts  →', syntaxHighlighter.resolveLanguageAlias('ts'));
console.log('   yml →', syntaxHighlighter.resolveLanguageAlias('yml'));
console.log('');

// Test highlighting individual code blocks with different themes
console.log('🎨 Theme Examples:\n');

const jsCode = 'const x = 42;\nconsole.log(x);';

console.log('   Theme: okaidia (dark)');
console.log('   ─'.repeat(40));
console.log(syntaxHighlighter.highlight(jsCode, 'javascript', 'okaidia'));
console.log('');

console.log('   Theme: tomorrow');
console.log('   ─'.repeat(40));
console.log(syntaxHighlighter.highlight(jsCode, 'javascript', 'tomorrow'));
console.log('');

console.log('   Theme: solarizelight');
console.log('   ─'.repeat(40));
console.log(syntaxHighlighter.highlight(jsCode, 'javascript', 'solarizelight'));
console.log('');

// Final stats
console.log('✅ Demo Complete!');
console.log(`   Languages now loaded: ${syntaxHighlighter.getLoadedLanguagesInfo().count}`);
console.log('   All languages loaded on-demand (not at startup)');
console.log('');

// Cleanup
fs.unlinkSync(testFile);

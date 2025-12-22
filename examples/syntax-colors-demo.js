#!/usr/bin/env node
/**
 * View actual syntax highlighting with colors in terminal
 * This demonstrates the ANSI color output
 */

const path = require('path');
const syntaxHighlighter = require(path.join(__dirname, '../lib/syntaxhighlighter'));

console.log('\n🌈 SYNTAX HIGHLIGHTING COLOR OUTPUT DEMO\n');

// Different code examples
const examples = [
  {
    title: 'JavaScript',
    code: `function greet(name) {
  const message = "Hello, " + name;
  console.log(message);
  return true;
}`,
    lang: 'javascript'
  },
  {
    title: 'Python',
    code: `def calculate(x, y):
    result = x + y
    print(f"Result: {result}")
    return result`,
    lang: 'python'
  },
  {
    title: 'Bash',
    code: `#!/bin/bash
echo "Starting..."
npm test
exit 0`,
    lang: 'bash'
  },
  {
    title: 'TypeScript',
    code: `interface Person {
  name: string;
  age: number;
}
const person: Person = { name: "Alice", age: 25 };`,
    lang: 'typescript'
  },
  {
    title: 'JSON',
    code: `{
  "name": "markshell",
  "version": "1.7.0",
  "active": true
}`,
    lang: 'json'
  },
  {
    title: 'Rust',
    code: `fn main() {
    let x = 42;
    println!("The answer is {}", x);
}`,
    lang: 'rust'
  }
];

// Render each example
examples.forEach(({ title, code, lang }) => {
  console.log(`${'═'.repeat(60)}`);
  console.log(`  ${title} (using alias: "${lang}")`);
  console.log(`${'═'.repeat(60)}`);

  const highlighted = syntaxHighlighter.highlight(code, lang, 'okaidia');
  console.log(highlighted);
  console.log('');
});

// Show loading statistics
console.log(`${'═'.repeat(60)}`);
console.log('📊 Language Loading Statistics');
console.log(`${'═'.repeat(60)}`);
const info = syntaxHighlighter.getLoadedLanguagesInfo();
console.log(`Languages loaded: ${info.count}`);
console.log(`List: ${info.languages.join(', ')}`);
console.log('');

// Show available themes
console.log(`${'═'.repeat(60)}`);
console.log('🎨 Available Themes');
console.log(`${'═'.repeat(60)}`);
const themes = ['okaidia', 'tomorrow', 'twilight', 'dark', 'coy', 'prism', 'solarizelight', 'funky'];
themes.forEach(theme => console.log(`  • ${theme}`));
console.log('');

// Compare themes side-by-side
const sampleCode = 'const x = "Hello";';
console.log(`${'═'.repeat(60)}`);
console.log('🎨 Theme Comparison (same JavaScript code)');
console.log(`${'═'.repeat(60)}`);

['okaidia', 'tomorrow', 'solarizelight'].forEach(theme => {
  console.log(`\n  Theme: ${theme}`);
  console.log(`  ${'-'.repeat(40)}`);
  console.log('  ' + syntaxHighlighter.highlight(sampleCode, 'js', theme).split('\n').join('\n  '));
});

console.log('\n✨ All syntax highlighting rendered with ANSI colors!\n');

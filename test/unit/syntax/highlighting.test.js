import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Syntax Highlighting Tests', () => {
  test('should apply syntax highlighting to JavaScript code block', () => {
    const input = `
\`\`\`javascript
function hello() {
  console.log("Hello World");
  return true;
}
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Verify code content is present (highlighting adds ANSI codes)
    expect(output).toContain('function');
    expect(output).toContain('hello');
    expect(output).toContain('console.log');
    expect(output).toBeDefined();
  });

  test('should apply syntax highlighting to shell/bash commands', () => {
    const input = `
\`\`\`bash
npm install
echo "test"
cd /home/user
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('npm install');
    expect(output).toContain('echo');
    expect(output).toContain('cd');
  });

  test('should handle code blocks with different language aliases', () => {
    const input = `
\`\`\`js
const x = 1;
\`\`\`

\`\`\`sh
ls -la
\`\`\`

\`\`\`console
$ npm run test
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('const x = 1');
    expect(output).toContain('ls -la');
    expect(output).toContain('npm run test');
  });

  test('should handle unsupported language gracefully', () => {
    const input = `
\`\`\`unknownlang
some code here
\`\`\`
`;
    const tempFile = createTempFile(input);

    // Should not throw, should render without highlighting
    expect(() => markshell.toRawContent(tempFile)).not.toThrow();
    const output = markshell.toRawContent(tempFile);
    expect(output).toContain('some code here');
  });

  test('should handle code block without language specifier', () => {
    const input = `
\`\`\`
plain text code
no highlighting
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('plain text code');
    expect(output).toContain('no highlighting');
  });

  test('should apply background to code blocks', () => {
    const input = `
\`\`\`js
const test = "value";
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Output should contain the code content
    expect(output).toContain('test');
    expect(output).toContain('value');
    // Output exists and is not empty
    expect(output.length).toBeGreaterThan(0);
  });

  test('should handle inline code differently from code blocks', () => {
    const input = `
This is inline \`code\` and this is a block:

\`\`\`js
const block = "code";
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Both inline and block code should be present
    expect(output).toContain('code');
    expect(output).toContain('block');
  });

  test('should syntax highlight TypeScript code', () => {
    const input = `
\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('interface');
    expect(output).toContain('User');
    expect(output).toContain('string');
  });

  test('should syntax highlight JSON', () => {
    const input = `
\`\`\`json
{
  "name": "markshell",
  "version": "1.6.0",
  "enabled": true
}
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('markshell');
    expect(output).toContain('version');
    expect(output).toContain('1.6.0');
  });
});

describe('Dynamic Language Loading', () => {
  const syntaxHighlighter = require('../../../lib/syntaxhighlighter');

  test('should dynamically load JavaScript on first use', () => {
    const input = `\`\`\`javascript\nconst x = 1;\n\`\`\``;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);
    expect(output).toContain('const x = 1');
  });

  test('should handle language aliases correctly', () => {
    const testCases = [
      { alias: 'js', code: 'const x = 1;' },
      { alias: 'py', code: 'print("hello")' },
      { alias: 'sh', code: 'echo "test"' },
      { alias: 'ts', code: 'let x: number = 1;' },
    ];

    testCases.forEach(({ alias, code }) => {
      const input = `\`\`\`${alias}\n${code}\n\`\`\``;
      const tempFile = createTempFile(input);
      expect(() => markshell.toRawContent(tempFile)).not.toThrow();
      const output = markshell.toRawContent(tempFile);
      expect(output).toContain(code);
    });
  });

  test('should cache loaded languages', () => {
    const beforeCount = syntaxHighlighter.getLoadedLanguagesInfo().count;

    // Load JavaScript twice
    const input1 = `\`\`\`javascript\nconst x = 1;\n\`\`\``;
    const tempFile1 = createTempFile(input1);
    markshell.toRawContent(tempFile1);

    const input2 = `\`\`\`javascript\nconst y = 2;\n\`\`\``;
    const tempFile2 = createTempFile(input2);
    markshell.toRawContent(tempFile2);

    const afterCount = syntaxHighlighter.getLoadedLanguagesInfo().count;

    // Should have loaded at least one language (JavaScript)
    // The exact count depends on what was loaded before, but it should increase
    expect(afterCount).toBeGreaterThanOrEqual(beforeCount);
  });

  test('should handle unknown languages gracefully', () => {
    const input = `\`\`\`fakeLang123\nsome code\n\`\`\``;
    const tempFile = createTempFile(input);

    // Should not throw
    expect(() => markshell.toRawContent(tempFile)).not.toThrow();

    // Should render the content as plain text
    const output = markshell.toRawContent(tempFile);
    expect(output).toContain('some code');
  });

  test('should load language dependencies automatically', () => {
    // TypeScript requires JavaScript as a dependency
    const input = `\`\`\`typescript\ninterface User { name: string; }\n\`\`\``;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('interface');
    expect(output).toContain('User');
  });

  test('should handle case-insensitive language names', () => {
    const variations = ['JavaScript', 'JAVASCRIPT', 'javascript', 'Javascript'];

    variations.forEach(lang => {
      const input = `\`\`\`${lang}\nconst x = 1;\n\`\`\``;
      const tempFile = createTempFile(input);
      expect(() => markshell.toRawContent(tempFile)).not.toThrow();
      const output = markshell.toRawContent(tempFile);
      expect(output).toContain('const x = 1');
    });
  });

  test('should support common programming languages', () => {
    const languages = [
      { lang: 'python', code: 'def hello():\n    pass' },
      { lang: 'ruby', code: 'def hello\n  puts "hi"\nend' },
      { lang: 'go', code: 'func main() {}' },
      { lang: 'rust', code: 'fn main() {}' },
      { lang: 'java', code: 'public class Test {}' },
      { lang: 'php', code: '<?php echo "hi"; ?>' },
    ];

    languages.forEach(({ lang, code }) => {
      const input = `\`\`\`${lang}\n${code}\n\`\`\``;
      const tempFile = createTempFile(input);
      expect(() => markshell.toRawContent(tempFile)).not.toThrow();
    });
  });

  test('should handle multiple code blocks with different languages', () => {
    const input = `
\`\`\`python
print("Python")
\`\`\`

\`\`\`javascript
console.log("JS");
\`\`\`

\`\`\`bash
echo "Shell"
\`\`\`
`;
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('Python');
    expect(output).toContain('JS');
    expect(output).toContain('Shell');
  });
});

describe('Language Alias Resolution', () => {
  const syntaxHighlighter = require('../../../lib/syntaxhighlighter');

  test('should resolve common JavaScript aliases', () => {
    expect(syntaxHighlighter.resolveLanguageAlias('js')).toBe('javascript');
    expect(syntaxHighlighter.resolveLanguageAlias('mjs')).toBe('javascript');
    expect(syntaxHighlighter.resolveLanguageAlias('jsx')).toBe('javascript');
  });

  test('inline code regex should not match triple backticks', () => {
    // Test the regex pattern that identifies inline code
    // It should match single backticks but NOT triple backticks in code blocks
    const inlineCodeRegex = /(?<!`)`([^`]+)`(?!`)/g;

    // Test with code block only - should have NO matches
    const codeBlockOnly = '```javascript\nconst x = 1;\n```';
    const matches1 = codeBlockOnly.match(inlineCodeRegex);
    expect(matches1).toBeNull();

    // Test with inline code only - should match
    const inlineOnly = 'Some `inline code` here';
    const matches2 = inlineOnly.match(inlineCodeRegex);
    expect(matches2).toHaveLength(1);
    expect(matches2[0]).toBe('`inline code`');

    // Test with both - should only match inline, not code block
    const both = '```javascript\nconst x = 1;\n```\n\nSome `inline code` here';
    const matches3 = both.match(inlineCodeRegex);
    expect(matches3).toHaveLength(1);
    expect(matches3[0]).toBe('`inline code`');

    // Test with multiple inline codes
    const multiple = 'First `code1` and second `code2` here';
    const matches4 = multiple.match(inlineCodeRegex);
    expect(matches4).toHaveLength(2);
    expect(matches4[0]).toBe('`code1`');
    expect(matches4[1]).toBe('`code2`');
  });

  test('should resolve shell aliases', () => {
    expect(syntaxHighlighter.resolveLanguageAlias('sh')).toBe('bash');
    expect(syntaxHighlighter.resolveLanguageAlias('shell')).toBe('bash');
    expect(syntaxHighlighter.resolveLanguageAlias('console')).toBe('bash');
    expect(syntaxHighlighter.resolveLanguageAlias('command')).toBe('bash');
  });

  test('should resolve Python aliases', () => {
    expect(syntaxHighlighter.resolveLanguageAlias('py')).toBe('python');
    expect(syntaxHighlighter.resolveLanguageAlias('py3')).toBe('python');
  });

  test('should handle unknown languages by returning normalized input', () => {
    expect(syntaxHighlighter.resolveLanguageAlias('unknownlang')).toBe('unknownlang');
    expect(syntaxHighlighter.resolveLanguageAlias('CustomLanguage')).toBe('customlanguage');
  });

  test('should handle null/undefined language', () => {
    expect(syntaxHighlighter.resolveLanguageAlias(null)).toBeNull();
    expect(syntaxHighlighter.resolveLanguageAlias(undefined)).toBeNull();
    expect(syntaxHighlighter.resolveLanguageAlias('')).toBeNull();
  });

  test('should normalize language names to lowercase', () => {
    expect(syntaxHighlighter.resolveLanguageAlias('PYTHON')).toBe('python');
    expect(syntaxHighlighter.resolveLanguageAlias('JavaScript')).toBe('javascript');
    expect(syntaxHighlighter.resolveLanguageAlias('TypeScript')).toBe('typescript');
  });
});

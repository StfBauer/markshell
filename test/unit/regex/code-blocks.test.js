import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Code Block Tests - Line Endings', () => {
  test('should handle Unix LF line endings', () => {
    const input = '```js\nconst x = 1;\nconsole.log(x);\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('const x = 1');
    expect(output).toBeDefined();
  });

  test('BUG: should handle Windows CRLF line endings (may fail)', () => {
    const input = '```js\r\nconst x = 1;\r\nconsole.log(x);\r\n```';
    const tempFile = createTempFile(input);

    // This may FAIL with current implementation due to inconsistency
    // Line 235 only matches \n, not \r\n
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('const x = 1');
    expect(output).toBeDefined();
  });

  test('should handle mixed line endings', () => {
    const input = '# Title\r\n\nCode:\n```js\nconst x = 1;\n```';
    const tempFile = createTempFile(input);

    expect(() => markshell.toRawContent(tempFile)).not.toThrow();
  });

  test('should handle code blocks without language', () => {
    const input = '```\nplain text\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('plain text');
  });

  test('should handle JavaScript code block', () => {
    const input = '```javascript\nfunction test() {\n  return true;\n}\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('function test');
    expect(output).toBeDefined();
  });

  test('should handle multiple code blocks', () => {
    const input = '```js\nconst a = 1;\n```\n\nSome text\n\n```js\nconst b = 2;\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('const a = 1');
    expect(output).toContain('const b = 2');
  });

  test('should handle shell/bash code blocks', () => {
    const input = '```bash\nnpm install\nrm -rf node_modules\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('npm install');
  });

  test('should handle empty code blocks', () => {
    const input = '```js\n```';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toBeDefined();
  });
});

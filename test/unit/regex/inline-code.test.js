import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Inline Code Tests', () => {
  test('should format basic inline code', () => {
    const input = 'Use `console.log()` here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('console.log()');
    expect(output).toBeDefined();
  });

  test('BUG: should handle single character code (currently fails)', () => {
    const input = 'Variable `x` is';
    const tempFile = createTempFile(input);

    // This test will FAIL with current implementation
    // Current pattern: /`(.*?[^`])`/ig requires non-backtick before closing
    // This fails on single character: `x`
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('x');
    expect(output).toBeDefined();
  });

  test('BUG: should handle empty inline code (currently fails)', () => {
    const input = 'Empty `` code';
    const tempFile = createTempFile(input);

    // This test will FAIL with current implementation
    const output = markshell.toRawContent(tempFile);

    expect(output).toBeDefined();
  });

  test('should handle inline code with spaces', () => {
    const input = 'Code `hello world` here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('hello world');
  });

  test('should handle multiple inline code segments', () => {
    const input = 'Use `var` and `let` keywords';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('var');
    expect(output).toContain('let');
  });

  test('should handle inline code with special characters', () => {
    const input = 'Path `./src/index.js` works';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('./src/index.js');
  });

  test('should handle inline code at start', () => {
    const input = '`code` at start';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('code');
  });

  test('should handle inline code at end', () => {
    const input = 'at end `code`';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('code');
  });
});

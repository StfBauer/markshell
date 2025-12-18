import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Emphasis/Italic Tests - Issue #36', () => {
  test('should support underscore emphasis', () => {
    const input = 'This is _italic_ text';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
    expect(output).toContain('text');
  });

  test('should support asterisk emphasis', () => {
    const input = 'This is *italic* text';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
    expect(output).toContain('text');
  });

  test('should support multi-word asterisk emphasis', () => {
    const input = 'This is *multiple italic words* here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('multiple italic words');
  });

  test('should not confuse asterisk emphasis with bold', () => {
    const input = 'This has **bold** and *italic* text';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Both bold and italic should be present
    expect(output).toContain('bold');
    expect(output).toContain('italic');
  });

  test('should handle mixed emphasis markers', () => {
    const input = 'Mix of _underscore_ and *asterisk* emphasis';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('underscore');
    expect(output).toContain('asterisk');
  });

  test('should handle emphasis at start of line', () => {
    const input = '*italic* normal text';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
  });

  test('should handle emphasis at end of line', () => {
    const input = 'normal text *italic*';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
  });

  test('should handle single character emphasis with asterisk', () => {
    const input = 'Letter *x* here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('x');
  });

  test('Issue #36 example: emphasis with underscores inside', () => {
    const input = '*example_text*';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Should render as italic with underscore preserved
    expect(output).toContain('example_text');
  });

  test('should not treat code_with_underscores as emphasis', () => {
    const input = 'Use my_variable_name here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Should not apply emphasis to identifiers
    expect(output).toContain('my_variable_name');
  });

  test('should handle consecutive emphasis', () => {
    const input = '*first* *second* *third*';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('first');
    expect(output).toContain('second');
    expect(output).toContain('third');
  });

  test('should not match triple asterisks as emphasis', () => {
    const input = '***bold italic*** or separate';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Should handle as bold+italic, not break
    expect(output).toBeDefined();
  });
});

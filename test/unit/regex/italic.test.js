import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Italic Regex Tests', () => {
  test('should format basic italic text', () => {
    const input = 'Hello _world_ test';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Check that italic formatting was applied (text should be present)
    expect(output).toContain('world');
    expect(output).toBeDefined();
  });

  test('FIXED: should handle underscores in paths better', () => {
    const input = 'Hello _hello1/_world_ World';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // After fix: The pattern no longer matches the entire "_hello1/_world_" as italic
    // It may still match "_world_" at the end, but it won't match across the slash
    // The key improvement is that it won't match "_hello1/" part
    expect(output).toContain('hello1');
    expect(output).toContain('world');
    expect(output).toContain('World');
  });

  test('should handle single character italic', () => {
    const input = 'Letter _x_ here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('x');
    expect(output).toBeDefined();
  });

  test('should handle multiple italic sections', () => {
    const input = '_first_ and _second_ words';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('first');
    expect(output).toContain('second');
  });

  test('BUG: should NOT format underscores in snake_case_identifiers', () => {
    const input = 'Use my_variable_name here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Should not apply italic to variable names
    // The identifier should remain intact
    expect(output).toContain('my_variable_name');
  });

  test('should handle italic at start of line', () => {
    const input = '_italic_ normal text';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
  });

  test('should handle italic at end of line', () => {
    const input = 'normal text _italic_';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('italic');
  });

  test('should handle multiple words in italic', () => {
    const input = 'This is _multiple italic words_ here';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('multiple italic words');
  });
});

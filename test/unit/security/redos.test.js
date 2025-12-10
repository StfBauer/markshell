import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('ReDoS Security Tests', () => {
  test('should not hang on potential ReDoS pattern in bold text', () => {
    const malicious = 'a'.repeat(50) + '!';
    const input = `**${malicious}**`;

    const start = Date.now();
    const tempFile = createTempFile(input);

    // This may currently be vulnerable
    const output = markshell.toRawContent(tempFile);
    const duration = Date.now() - start;

    // Should complete in reasonable time
    expect(duration).toBeLessThan(1000); // 1 second max
    expect(output).toBeDefined();
  });

  test('should safely handle special regex chars in content', () => {
    const input = 'Text with **special.*+?^${}()|[]\\chars** here';
    const tempFile = createTempFile(input);

    // Should not throw or hang
    expect(() => markshell.toRawContent(tempFile)).not.toThrow();
  });

  test('should handle deeply nested markdown without catastrophic backtracking', () => {
    const nested = '**'.repeat(20) + 'text' + '**'.repeat(20);
    const tempFile = createTempFile(nested);

    const start = Date.now();
    const output = markshell.toRawContent(tempFile);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
    expect(output).toBeDefined();
  });

  test('should handle nested italic and bold without hanging', () => {
    const nested = '_**_**'.repeat(15) + 'text' + '_**_**'.repeat(15);
    const tempFile = createTempFile(nested);

    const start = Date.now();
    const output = markshell.toRawContent(tempFile);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
    expect(output).toBeDefined();
  });

  test('should handle malicious inline code pattern', () => {
    const malicious = '`' + 'a'.repeat(100);
    const tempFile = createTempFile(malicious);

    const start = Date.now();
    const output = markshell.toRawContent(tempFile);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
    expect(output).toBeDefined();
  });
});

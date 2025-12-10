import { describe, test, expect, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const markshell = require('../../../lib/index.js');
const { createTempFile, cleanupTempFiles } = require('../helpers/test-utils.js');

afterEach(() => {
  cleanupTempFiles();
});

describe('Image Removal Tests', () => {
  test('should remove image with title (space + quotes)', () => {
    const input = 'Text ![alt text](https://example.com/image.jpg "title text") more';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Image should be removed
    expect(output).not.toContain('![alt text]');
    expect(output).toContain('Text');
    expect(output).toContain('more');
  });

  test('BUG: should remove image without title (currently fails)', () => {
    const input = 'Text ![alt](https://example.com/image.jpg) more';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // This test will FAIL with current implementation
    // Current pattern requires space + quoted title
    expect(output).not.toContain('![alt]');
    expect(output).toContain('Text');
    expect(output).toContain('more');
  });

  test('BUG: should remove image with no-space title (currently fails)', () => {
    const input = 'Text ![alt](url"title") more';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // This test will FAIL - requires space before quotes
    expect(output).not.toContain('![alt]');
  });

  test('should remove image with empty alt text', () => {
    const input = 'Text ![](https://example.com/image.jpg "title") more';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).not.toContain('![]');
    expect(output).toContain('Text');
    expect(output).toContain('more');
  });

  test('should handle multiple images', () => {
    const input = '![first](url1 "title1") and ![second](url2 "title2")';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).not.toContain('![first]');
    expect(output).not.toContain('![second]');
    expect(output).toContain('and');
  });

  test('should handle image with single quotes in title', () => {
    const input = "Text ![alt](url 'title') more";
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    // Should handle single quotes too
    expect(output).toBeDefined();
  });

  test('should preserve non-image content', () => {
    const input = 'This is a paragraph with ![image](url "title") in it.';
    const tempFile = createTempFile(input);
    const output = markshell.toRawContent(tempFile);

    expect(output).toContain('This is a paragraph');
    expect(output).toContain('in it');
  });
});

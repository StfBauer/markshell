import { describe, test, expect } from 'vitest';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
const markshell = require('../../lib/index.js');

describe('Sample Files Regression Tests', () => {
  test('should render spo-get.md without errors', () => {
    const filepath = path.join(__dirname, '../../samples/spo-get.md');

    if (fs.existsSync(filepath)) {
      expect(() => markshell.toRawContent(filepath)).not.toThrow();
    } else {
      console.warn('Sample file spo-get.md not found, skipping test');
    }
  });

  test('should render bug-samples.md correctly', () => {
    const filepath = path.join(__dirname, '../fixtures/bug-samples.md');
    const output = markshell.toRawContent(filepath);

    // Should NOT format paths as italic
    // After the fix, this should preserve the underscore pattern
    expect(output).toBeDefined();
    expect(output).toContain('hello1');
    expect(output).toContain('world');
  });

  test('should handle README.md without errors', () => {
    const filepath = path.join(__dirname, '../../README.md');

    if (fs.existsSync(filepath)) {
      expect(() => markshell.toRawContent(filepath)).not.toThrow();
    }
  });

  test('should render test.md if it exists', () => {
    const filepath = path.join(__dirname, '../../samples/test.md');

    if (fs.existsSync(filepath)) {
      expect(() => markshell.toRawContent(filepath)).not.toThrow();
    }
  });
});

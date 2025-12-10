const fs = require('fs');
const path = require('path');
const os = require('os');

let tempFiles = [];

/**
 * Create a temporary markdown file for testing
 * @param {string} content - The markdown content to write
 * @returns {string} - Path to the temporary file
 */
function createTempFile(content) {
  const tempDir = os.tmpdir();
  const tempFile = path.join(tempDir, `markshell-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.md`);
  fs.writeFileSync(tempFile, content, 'utf8');
  tempFiles.push(tempFile);
  return tempFile;
}

/**
 * Clean up all temporary files
 */
function cleanupTempFiles() {
  tempFiles.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });
  tempFiles = [];
}

/**
 * Get the path to a fixture file
 * @param {string} filename - Name of the fixture file
 * @returns {string} - Full path to the fixture file
 */
function getFixturePath(filename) {
  return path.join(__dirname, '../../fixtures', filename);
}

/**
 * Setup/teardown for tests
 * @param {object} context - Test context object with afterEach method
 */
function setupTestHelpers(context) {
  if (context.afterEach) {
    context.afterEach(() => {
      cleanupTempFiles();
    });
  }
}

module.exports = {
  createTempFile,
  cleanupTempFiles,
  getFixturePath,
  setupTestHelpers
};

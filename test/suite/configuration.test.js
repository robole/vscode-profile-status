/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const configuration = require("../../src/configuration");

const workspaceAlignment = "Left";

suite("Configuration", () => {
  /* This test is based on the user settings, so could fail if you
	have a different setting  */

  test('Should retrieve the value of the "alignment" option', () => {
    const alignment = configuration.getAlignment();
    assert.strictEqual(alignment, workspaceAlignment);
  });
});

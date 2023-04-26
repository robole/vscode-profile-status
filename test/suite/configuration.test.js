/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const configuration = require("../../src/configuration");

const workspaceAlignment = "Right";

suite("Configuration", () => {
  /*I have settings specific to this project in .vscode/settings.json. This will
	ensure that this test is reliable */

  test('Should retrieve the value of the "alignment" option', () => {
    const alignment = configuration.getAlignment();
    assert.strictEqual(alignment, workspaceAlignment);
  });
});

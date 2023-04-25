/* eslint-disable import/no-unresolved, node/no-missing-require */
const assert = require("assert");
const path = require("path");
const vscode = require("vscode");
const configuration = require("../../src/configuration");

const workspaceAlignment = "Right";

suite("Configuration", () => {
  //workspace settings are set in .vscode/settings.json

  test('get the default value of "Alignment"', () => {
    const alignment = configuration.getAlignment();
    assert.strictEqual(alignment, workspaceAlignment);
  });
});

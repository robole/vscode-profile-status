const vscode = require("vscode");

const prefix = "profileStatus";

function getPrefix() {
  return prefix;
}

function getAlignment() {
  let alignment = "";

  if (vscode.workspace) {
    const config = vscode.workspace.getConfiguration(prefix);
    alignment = config.get("itemAlignment");
  }

  return alignment;
}

module.exports = {
  getAlignment,
  getPrefix,
};

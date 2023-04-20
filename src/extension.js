const vscode = require("vscode");
const statusBarItem = require("./statusBarItem");
const globalSettings = require("./globalSettings");

async function activate(context) {
  let workspaceUri = vscode.workspace.workspaceFolders[0].uri;
  let profileName = await globalSettings.getProfileName(workspaceUri);

  let item = statusBarItem.build("Right");
  item.text = `Profile: ${profileName}`;
  item.show();
}

module.exports = {
  activate,
};

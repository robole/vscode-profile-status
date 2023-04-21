const vscode = require("vscode");
const statusBarItem = require("./statusBarItem");
const globalSettings = require("./globalSettings");

async function activate(context) {
  let workspaceFolders = vscode.workspace.workspaceFolders;

  if (workspaceFolders) {
    let mainWorkspaceUri = workspaceFolders[0].uri;
    let profileName = await globalSettings.getProfileName(mainWorkspaceUri);

    let item = statusBarItem.build("Right");
    item.text = `Profile: ${profileName}`;
    item.show();
  }
}

module.exports = {
  activate,
};

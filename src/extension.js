const vscode = require("vscode");
const statusBarItem = require("./statusBarItem");
const Environment = require("./environment");

async function activate(context) {
  let workspaceFolders = vscode.workspace.workspaceFolders;

  // a workspace is open
  if (workspaceFolders) {
    let mainWorkspaceUri = workspaceFolders[0].uri;

    try {
      let env = new Environment(context);
      let globalState = await env.getGlobalState();
      let profileName = globalState.getProfileName(mainWorkspaceUri);

      let item = statusBarItem.build("Right");
      item.text = `Profile: ${profileName}`;
      item.show();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  activate,
};

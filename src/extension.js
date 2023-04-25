const vscode = require("vscode");
const statusBarItem = require("./statusBarItem");
const Environment = require("./environment");
const globalState = require("./globalState");

async function activate(context) {
  let workspaceFolders = vscode.workspace.workspaceFolders;

  // a workspace is open
  if (workspaceFolders) {
    let mainWorkspaceUri = workspaceFolders[0].uri;

    try {
      let env = new Environment(context);
      let globalStateUri = env.getGlobalStateUri();

      let state = globalState(globalStateUri);
      let profileName = await state.getProfileName(mainWorkspaceUri);

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

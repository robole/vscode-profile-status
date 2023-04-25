const vscode = require("vscode");
const statusBarItem = require("./statusBarItem");
const Environment = require("./environment");
const globalState = require("./globalState");
const configuration = require("./configuration");

let item;
let profileName;

async function activate(context) {
  let workspaceFolders = vscode.workspace.workspaceFolders;

  // a workspace is open
  if (workspaceFolders) {
    let mainWorkspaceUri = workspaceFolders[0].uri;

    try {
      let env = new Environment(context);
      let globalStateUri = env.getGlobalStateUri();

      let state = globalState(globalStateUri);
      profileName = await state.getProfileName(mainWorkspaceUri);

      showStatusBarItem();

      let disposable = vscode.workspace.onDidChangeConfiguration(
        changeConfigurationHandler
      );

      context.subscriptions.push(disposable);
    } catch (err) {
      console.error(err);
    }
  }
}

function showStatusBarItem() {
  let alignment = configuration.getAlignment();
  item = statusBarItem.build(`Profile: ${profileName}`, alignment);
  item.show();
}

function reload() {
  item.dispose();
  showStatusBarItem();
}

function changeConfigurationHandler(e) {
  // update only if extension setting was changed
  if (e.affectsConfiguration(configuration.getPrefix())) {
    reload();
  }
}

module.exports = {
  activate,
};

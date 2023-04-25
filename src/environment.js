const vscode = require("vscode");
const path = require("path");

/**
 * App information about local system.
 */
class Environment {
  constructor(context) {
    this.globalStateUri = resolveGlobalStateUri(context);
  }

  /**
   * Get the URI of the storage.json file that represents the global workspace state.
   */
  getGlobalStateUri() {
    return vscode.Uri.file(this.globalStateUri);
  }
}

module.exports = Environment;

/**
 * Resolve the filepath for storage.json file.
 */
function resolveGlobalStateUri(context) {
  let portableAppPath = process.env.VSCODE_PORTABLE;
  let filepath = "";

  if (portableAppPath === undefined) {
    filepath = path.join(
      context.globalStoragePath,
      "../../..",
      "User",
      "globalStorage",
      "storage.json"
    );
  } else {
    filepath = path.join(
      portableAppPath,
      "user-data",
      "User",
      "globalStorage",
      "storage.json"
    );
  }

  return filepath;
}

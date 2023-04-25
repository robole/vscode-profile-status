const path = require("path");
const fs = require("fs/promises");
const GlobalState = require("./globalState");

/**
 * Environment information.
 */
class Environment {
  constructor(context) {
    this.context = context;
    this.os = process.platform;
    this.globalStateUri = resolveGlobalStateUri(context);
  }

  /**
   * Get the JSON object of the storage.json file that represents the global workspace state.
   */
  async getGlobalState() {
    let content = await fs.readFile(this.globalStateUri);
    let obj = JSON.parse(content);
    let globalState = new GlobalState(obj);

    return globalState;
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

const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const glob = require("glob");

/**
 * Environment information.
 */
class Environment {
  constructor(context) {
    this.context = context;
    this.os = process.platform;
    this.portableAppPath = process.env.VSCODE_PORTABLE;
    this.globalStoragePath = this.resolveGlobalStoragePath();
  }

  /**
   * Resolve the filepath for storage.json file.
   */
  resolveGlobalStoragePath() {
    let filepath = "";

    if (this.portableAppPath === undefined) {
      filepath = path.join(
        this.context.globalStoragePath,
        "../../..",
        "User",
        "globalStorage",
        "storage.json"
      );
    } else {
      filepath = path.join(
        this.portableAppPath,
        "user-data",
        "User",
        "globalStorage",
        "storage.json"
      );
    }

    return filepath;
  }

  /**
   * Get the filepath for storage.json file that contains the global workspace state.
   */
  getGlobalStoragePath() {
    return this.globalStoragePath;
  }
}
module.exports = Environment;

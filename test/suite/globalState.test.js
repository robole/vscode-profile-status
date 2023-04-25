const assert = require("assert");
const vscode = require("vscode");
const path = require("path");
const globalState = require("../../src/globalState");

suite("Global State", () => {
  let sampleStorageFile = path.resolve(__dirname, "sample", "storage.json");

  test("Should retrieve the name of the associated workspace profile", async function () {
    let uri = vscode.Uri.file(sampleStorageFile);
    let gs = globalState(uri);

    let workspaceUri = vscode.Uri.file(
      "home/rob/programming/workspace/js/vscode/vscode-profile-status"
    );
    let name = await gs.getProfileName(workspaceUri);

    assert.strictEqual(name, "Teaching");
  });

  test("Should retrieve the name 'Default' of the associated workspace profile when the default profile is used ", async function () {
    let uri = vscode.Uri.file(sampleStorageFile);
    let gs = globalState(uri);

    let workspaceUri = vscode.Uri.file(
      "home/rob/programming/workspace/web/artifice"
    );
    let name = await gs.getProfileName(workspaceUri);

    assert.strictEqual(name, "Default");
  });

  test("Should retrieve the name 'Unknown' when no profile is associated with the workspace yet", async function () {
    let uri = vscode.Uri.file(sampleStorageFile);
    let gs = await globalState(uri);

    let workspaceUri = vscode.Uri.file(
      "home/rob/programming/workspace/js/vscode/x"
    );
    let name = await gs.getProfileName(workspaceUri);

    assert.strictEqual(name, "Unknown");
  });
});

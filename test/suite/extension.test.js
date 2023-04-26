const assert = require("assert");
const vscode = require("vscode");

suite("Extension", () => {
  const extensionShortName = "profile-status";
  const publisherName = "robole";
  const extensionID = `${publisherName}.${extensionShortName}`;

  let extension;

  suiteSetup(() => {
    extension = vscode.extensions.getExtension(extensionID);
  });

  test("Should regiseter all package.json commands in the extension", async () => {
    // get active commands for this extension
    const allCommands = await vscode.commands.getCommands(true);
    const extensionActiveCommands = allCommands.filter((c) =>
      c.startsWith(`${extensionShortName}.`)
    );

    // commands declared in package.json
    const packageCommands = extension.packageJSON.contributes.commands.map(
      (c) => c.command
    );

    packageCommands.forEach((command) => {
      const result = extensionActiveCommands.some((c) => c === command);
      assert.strictEqual(
        result,
        true,
        `${command} command is in package.json but not registered in extension.`
      );
    });
  });
});

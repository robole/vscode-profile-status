const assert = require("assert");
const Environment = require("../../src/environment");

suite("Environment", () => {
  test("Should retrieve the URI of the global state file on unix-like machines (Linux, Mac)", () => {
    if (process.platform !== "win32") {
      // globalStoragePath value is bogus but path follows this pattern
      let context = {
        globalStoragePath:
          "/home/xyz/.config/Code/User/globalStorage/robole.profile-status",
      };

      let env = new Environment(context);
      let uri = env.getGlobalStateUri();

      assert.strictEqual(
        uri.fsPath,
        "/home/xyz/.config/Code/User/globalStorage/storage.json"
      );
    }
  });

  // Have not be able to run this test as I do not have a Windows machine!!!
  test("Should retrieve the URI of the global state file on a Windows machine", () => {
    if (process.platform === "win32") {
      // globalStoragePath value is bogus but path follows this pattern
      let context = {
        globalStoragePath:
          "C:\\Users\\xyz\\AppData\\Roaming\\Code\\User\\globalStorage\\robole.profile-status",
      };

      let env = new Environment(context);
      let uri = env.getGlobalStateUri();

      assert.strictEqual(
        uri.fsPath,
        "c:\\Users\\xyz\\AppData\\Roaming\\Code\\User\\globalStorage\\storage.json"
      );
    }
  });
});

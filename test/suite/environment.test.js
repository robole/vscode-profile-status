const assert = require("assert");
const Environment = require("../../src/environment");

suite("Environment", () => {
  // globalStoragePath value is bogus
  let context = {
    globalStoragePath:
      "/home/xyz/.config/Code/User/globalStorage/robole.profile-status",
  };

  test("Should retrieve the URI of the global state file", () => {
    let env = new Environment(context);
    let uri = env.getGlobalStateUri();

    assert.strictEqual(
      uri.path,
      "/home/xyz/.config/Code/User/globalStorage/storage.json"
    );
  });
});

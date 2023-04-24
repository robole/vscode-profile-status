const vscode = require("vscode");
const fs = require("fs/promises");
const Environment = require("./environment");

const DEFAULT_PROFILE_ID_STRING = "__default__profile__";
let settings;

async function loadSettings(context) {
  let content;

  try {
    let env = new Environment(context);
    let settingsFile = env.getGlobalStoragePath();

    content = await fs.readFile(settingsFile);
    settings = JSON.parse(content);
  } catch (err) {
    vscode.window.showErrorMessage(
      `Could not read storage.json. Please report this as an issue. Error: ${err} `
    );
  }
}

function getProfileByName(id) {
  let profileName = "unknown";

  if (id === DEFAULT_PROFILE_ID_STRING) {
    profileName = "Default";
  } else if (settings.userDataProfiles) {
    let profileFound = settings.userDataProfiles.find((item) => {
      return item.location === id;
    });

    if (profileFound) {
      profileName = profileFound.name;
    }
  }

  return profileName;
}

function getProfileName(workspaceUri) {
  let name = "Unknown";

  if (settings.profileAssociations.workspaces) {
    //association is in form of: { workspace_uri : profile_id}
    const workspaceAssociations = settings.profileAssociations.workspaces;

    let profileID;

    Object.keys(workspaceAssociations).every((key) => {
      if (workspaceUri._formatted === key) {
        profileID = workspaceAssociations[key];
        return false;
      }
      return true;
    });

    name = getProfileByName(profileID);
  }

  return name;
}

module.exports = {
  loadSettings,
  getProfileName,
};

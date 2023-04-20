const vscode = require("vscode");
const fs = require("fs/promises");

const DEFAULT_PROFILE_ID_STRING = "__default__profile__";
let settingsFile = "/home/rob/.config/VSCodium/User/globalStorage/storage.json";

let settings;

async function loadSettings() {
  let content;

  try {
    content = await fs.readFile(settingsFile);
    settings = JSON.parse(content);
  } catch (err) {
    vscode.window.showErrorMessage(
      `Could not read storage.json. Please report this as an issue. Error: ${err} `
    );
  }
}

async function getProfileByName(id) {
  if (settings === undefined) {
    await loadSettings();
  }

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

async function getProfileName(workspaceUri) {
  let name = "Unknown";

  if (settings === undefined) {
    await loadSettings();
  }

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

    name = await getProfileByName(profileID);
  }
  return name;
}

module.exports = {
  getProfileName,
};

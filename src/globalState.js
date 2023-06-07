const fs = require("fs/promises");

/**
 *  Profiles are identified by an internal ID e.g 6c702312. We retrieve the name of the profile through this ID.
 */
function getName(obj, id) {
  let profileName = "Default";

  if (obj.userDataProfiles) {
    let profileFound = obj.userDataProfiles.find((item) => item.location === id);

    if (profileFound) {
      profileName = profileFound.name;
    }
  }

  return profileName;
}

/*
 * Is it an empty object?
 */
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/*
 * Closure for Global State
 */
function globalState(uri) {
  let obj = {};

  async function parseFile() {
    try {
      let data = await fs.readFile(uri.fsPath);
      obj = JSON.parse(data);
    } catch (err) {
      console.error(
        `Cannot read ${uri.fsPath} to instantiate GlobalState. Err: ${err}`
      );
    }
  }

  /**
   * Get the name of the profile associated with a workspace.
   */
  async function getProfileName(workspaceUri) {
    let name;

    if (isEmpty(obj)) {
      await parseFile();
    }

    if (obj.profileAssociations && obj.profileAssociations.workspaces) {
      // association is in form of: { workspace_uri : profile_id}
      const workspaceAssociations = obj.profileAssociations.workspaces;

      let profileID;

      Object.keys(workspaceAssociations).every((key) => {
        let workspaceUriString = workspaceUri.toString();

        if (workspaceUriString === key) {
          profileID = workspaceAssociations[key];
          return false;
        }

        return true;
      });

      name = getName(obj, profileID);
    }

    return name;
  }

  return {
    getProfileName,
  };
}

module.exports = globalState;

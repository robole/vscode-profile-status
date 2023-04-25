const fs = require("fs/promises");

/**
 *  Profiles are identified by an internal ID e.g 6c702312. We retrieve the name of the profile through this ID.
 */
function getName(obj, id) {
  const DEFAULT_PROFILE_ID_STRING = "__default__profile__";

  let profileName = "Unknown";

  if (id === DEFAULT_PROFILE_ID_STRING) {
    profileName = "Default";
  } else if (obj.userDataProfiles) {
    let profileFound = obj.userDataProfiles.find((item) => {
      return item.location === id;
    });

    if (profileFound) {
      profileName = profileFound.name;
    }
  }

  return profileName;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function globalState(uri) {
  let obj = {};

  async function parseFile() {
    try {
      let data = await fs.readFile(uri.path);
      obj = JSON.parse(data);
    } catch (err) {
      console.error(
        `Cannot read ${uri.path} to instantiate GlobalState. Err: ${err}`
      );
    }
  }

  /**
   * Get the name of the profile associated with a workspace.
   */
  async function getProfileName(workspaceUri) {
    let name = "Unknown";

    if (isEmpty(obj)) {
      await parseFile();
    }

    if (obj.profileAssociations && obj.profileAssociations.workspaces) {
      //association is in form of: { workspace_uri : profile_id}
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

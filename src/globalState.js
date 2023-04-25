/**
 * Global state of workspaces
 */
class GlobalState {
  constructor(obj) {
    this.obj = obj;
  }

  /**
   * Get the name of the profile associated with a workspace.
   */
  getProfileName(workspaceUri) {
    let name = "Unknown";

    if (
      this.obj.profileAssociations &&
      this.obj.profileAssociations.workspaces
    ) {
      //association is in form of: { workspace_uri : profile_id}
      const workspaceAssociations = this.obj.profileAssociations.workspaces;

      let profileID;

      Object.keys(workspaceAssociations).every((key) => {
        if (workspaceUri._formatted === key) {
          profileID = workspaceAssociations[key];
          return false;
        }
        return true;
      });

      name = getName(this.obj, profileID);
    }

    return name;
  }
}

/**
 *  Profiles are identified by an internal ID e.g 6c702312. This gets the name of the profile associated with the ID.
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

module.exports = GlobalState;

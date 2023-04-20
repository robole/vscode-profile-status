const vscode = require("vscode");

/**
 * Factory method to create a new status bar item
 */
function build(alignment = "Left") {
  // priority determines how far to the left or right the item
  // is aligned. These arbitary numbers gave me the result I desired,
  // which is to keep the item closest to the center of the bar
  let priority = 0;
  let alignmentEnumValue = vscode.StatusBarAlignment.Left;

  if (alignment === "Right") {
    alignmentEnumValue = vscode.StatusBarAlignment.Right;
    priority = 10000;
  }

  let statusBarItem = vscode.window.createStatusBarItem(
    alignmentEnumValue,
    priority
  );

  statusBarItem.command = "workbench.profiles.actions.switchProfile";

  return statusBarItem;
}

module.exports = {
  build,
};

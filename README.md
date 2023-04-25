<h1 align="center">
  <br>
    <img align="center" src="img/logo.png" width="200">
  <br>
	<br>
  Profile Status
  <br>
  <br>
</h1>
<h4 align="center">Know which your profile you're using, no doubt</h4>

<p align="center">
<img src="https://img.shields.io/static/v1?logo=visual-studio-code&label=made%20for&message=VS%20Code&color=0000ff" alt="Made for VSCode">
<img src="https://img.shields.io/visual-studio-marketplace/v/robole.profile-status?logo=visual-studio-code&color=ffa500" alt="Visual Studio Marketplace Version">
<img src="https://img.shields.io/static/v1?logo=visual-studio-code&label=size&message=50KB&color=008000"
alt="Extension file size in bytes">
<img src="https://img.shields.io/visual-studio-marketplace/r/robole.profile-status?logo=visual-studio-code&color=yellow" alt="Visual Studio Marketplace Rating">
<img src="https://img.shields.io/visual-studio-marketplace/d/robole.profile-status?logo=visual-studio-code&color=blue" alt="downloads"/>
<img src="https://img.shields.io/visual-studio-marketplace/i/robole.profile-status?logo=visual-studio-code&color=blue" alt="installs"/>
<img src="https://img.shields.io/static/v1?label=built%20with&message=flava%20in%20ya%20ear%20%26%20javascript&color=violet" alt="Built with flava in ya ear and javascript"/>
<a href="https://ko-fi.com/roboleary"><img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-$4-orange?logo=buy-me-a-coffee" alt="Buy Rob OLeary a coffee"></a>
</p>

The profile name appears as an item on the left-hand side of the status bar.

You can change the profile by clicking the item.

## Activation

The extension is loaded after VS Code has fully loaded. It is non-blocking, so does not affect startup times.

To be more specific, the [activation event](https://code.visualstudio.com/api/references/activation-events) is `onStartupFinished`.

## Settings

| Name                                               | Type    | Default | Description                                            |
| -------------------------------------------------- | ------- | ------- | ------------------------------------------------------ |
| Profile Status: Alignment | String (enum) | "Left"   | Set the position on the status bar. Values are : "Left" and "Right".|

## Contribute

If there is a bug or you have a suggestion, please raise an issue.

## Appreciate

You can show your appreciation by:
1. **[Buying me a coffee or sponsoring me](https://ko-fi.com/roboleary)**. This will offer me encouragement to continue with this project and others. It can provide a path to dedicating more time to open-source in the future.
1. **Starring the repo 🌟**. This will help other people find this.

Thank you! 🙏

## FAQ

### Why isn't it appearing in the Status Bar?

Perhaps, this extension is not included in your current profile. Run the command **`Profiles: Show contents...`** to check.

The item may have been forced out (not enough room), or hidden! Right-clicking on the status bar shows a complete list of status bar items, and if they are enabled or not.

### Does this extension support multi-root workspaces?

No! I do not use them!

If you would like support added, raise an issue to request the feature. A contibution is welcome.

### Does this support remote or WSL (Windows Subsystem for Linux)?

The extensions looks on the local file system for the global state in a file called *storage.json*. This may not be available when you are working remotely, or in WSL.

If you have a suggestion to add support - a contibution is welcome.

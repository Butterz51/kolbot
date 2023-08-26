/**
 *  @filename: 	Settings.js
 *  @author:   	Butterz
 *  @desc: 		Tools/Settings for Kolbot
 * 
 *  @spec: 		SoloPlay (!!R) - Required for some features
 *  @Note: 		When you see (!!R) next to SoloPlay, it indicates that SoloPlay is essential for certain features to work correctly. 
 * 				Please make sure to enable SoloPlay for a seamless experience with those features.
 */ 

const Features = {
	/** @desc Enables some features from SoloPlay to be called from Base Kolbot as well. **/
	SoloPlayPluggin: {
		Enabled: false, // Set this to true if you have SoloPlay & want to use some of the features.
	},

	/** @desc The easiest way to set the delay/timers. **/
	ProfilesPerIP: {
    	StaticProfiles: 1, // Change this value as needed (Max amount 8 profiles per IP).
    	// Array of profiles with the corresponding number of IPs being used
    	ProfilesArray: [
      		//{ Profile: "sCl-ExAmpLE", IPs: 1 },
      		// Add more profiles here as needed
    	],
  	},

	/** @desc Set to true if you want to report DClone walks and SOJ sales to https://d2soj.com. **/
	WebLogging: {
		IPreport: false, // Enable reporting of connected games IP. (The feature is not yet fully prepared for implementation at this time.)
		Walk: false, // Enable DClone Walk logging.
		Report: false, // Report DClone Walks to the website.
		ReportName: "Butterz", // Choose your name to be displayed on the website (Max characters 10).
	},

	/** @desc Turn features ON/OFF on the D2Bot Status (Manager). **/
	Status: {
		Tracker: false, // (!!R) Requires SoloPlay to work.
		IPAddress: true, // Display the current IP address you are connected to in the game.
		Account: true, // Show the player's account name.
		Char: true, // Display the character name of the player.
		Level: true, // Show the level of the player's character.
		XP: true, // Display the percentage of experience gained by the character.
		Difficulty: true, // Show the current difficulty level of the player's character.
		Area: true, // Display the current location or area where the player's character is in the game.
		Gold: true, // Show the amount of gold the player's character has.
		Resistance: false, // (!!R) Display the resistances of the player's character (e.g., Fire, Cold, Lightning, Poison).
	},

	/** @desc Remove some messaging from the console (D2Bot). **/
	Console: {
		HideChickens: false, // Disable printing chicken info.
		HideDeaths: false, // Disable printing death info.
		HideMuleMsg: false, // Disable printing of automule messages (errors will not be hidden).
		HideMuleLog: false, // Disable printing of the automule account logging.
		HideRuneWord: false, // Disable the made runeword messages from being displayed.
		HideErrors: false, // Do not display errors from scripts.
		ScreenShotErr: false, // Takes a screenshot of the errors.
		HideConsolePrint: false, // Disable printing to the console.
		HidePing: false, // Disable printing high ping messages into the console.
	},

	/** @desc (!!R) Remove some SoloPlay messaging from the console (D2Bot). **/
	SoloPlayConsole: {
		HideSocket: false, // Disable the used socket quest messages from being displayed.
		HideImbue: false, // Disable the used imbue quest messages from being displayed.
		HideBroke: false, // Disable the broke messages from being displayed.
		HideAccLogging: false, // Disable the fill account logging from being displayed.
		HideGoalAchieved: false, // Disable the Goal Reached message from being displayed.
		HideStorage: false, // Disable the storage warning messages from being displayed.
		HideErrors: false, // Do not display errors from scripts.
	},

	/** @desc Configure DClone logging settings. **/
	Dclone: {
		LogEnabled: false, // Set to false to disable logging of DClone walks/kills
	},
};

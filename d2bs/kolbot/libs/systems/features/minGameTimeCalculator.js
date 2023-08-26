/**
*  @filename    minGameTimeCalculator.js
*  @author      Butterz
*  @desc        This script is designed to calculate and set the minimum game time for a game profile.
*               The script checks the provided profile against a profiles array and determines the minimum game time
*               based on the number of profiles associated with the same IP address. It takes into account maximum
*               allowed profiles per IP address and applies additional game time based on the number of profiles.
*               The calculations are configured with various thresholds to ensure fair game duration. The script also
*               provides validation for profile IP and numProfiles values and prints error messages if these values
*               exceed specified limits. Overall, the script helps manage game time allocation for different profiles,
*               promoting balanced gameplay.
*/

/**
 * Calculates and sets the minimum game time based on profile data.
 * If the profile is found in the profiles array, calculates the minimum game time
 * using individual profile IP count. Otherwise, uses default settings.
 *
 * @returns {number} The calculated minimum game time.
 */

function calculateAndSetMinGameTime () {
  const maxAllowedProfilesPerIP = 8; // Maximum number of allowed profiles per single IP address
  
  try {
    const profilesArray = Features.ProfilesPerIP.ProfilesArray;
    const profileInArray = profilesArray.find(profile => profile.ProfileName.toUpperCase() === me.profile.toUpperCase());

    // Initialize minGameTime based on profilesArray or default
    let minGameTime = Infinity;

    if (profileInArray) {
      // Calculate the MinGameTime based on individual profile IP count
      let clampedNumProfiles = Math.min(profileInArray.IP, maxAllowedProfilesPerIP);

      if (profileInArray.IP > maxAllowedProfilesPerIP) {
        throw new Error("Invalid IP value in ProfilesArray. Maximum allowed is " + maxAllowedProfilesPerIP);
      }

      minGameTime = calculateMinGameTime(clampedNumProfiles);
    } else {
      // Calculate the MinGameTime using default settings
      const numProfiles = Features.ProfilesPerIP.StaticProfiles;
      let clampedNumProfiles = Math.min(numProfiles, maxAllowedProfilesPerIP);

      if (numProfiles > maxAllowedProfilesPerIP) {
        throw new Error("Invalid numProfiles value. Maximum allowed is " + maxAllowedProfilesPerIP);
      }

      minGameTime = calculateMinGameTime(clampedNumProfiles);
    }

    return minGameTime;
  } catch (error) {
    return 180;
  }
}


/**
 * Calculates the minimum game time based on the number of profiles,
 * taking into account the maximum allowed profiles per IP address.
 *
 * @param {number} numProfiles - The number of profiles sharing the same IP address.
 * @returns {number} The calculated minimum game time.
 */

function calculateMinGameTime (numProfiles) {
  // Maximum number of allowed profiles per single IP address
  const maxAllowedProfilesPerIP = 8;

  // Default Game Time Configuration
  const defaultMinGameTime = 600; // Default game duration (in seconds) for a single profile on one IP address (Super Safe 10 minutes)

  // Calculate additional game time based on the number of profiles
  const additionalMinGameTimePerProfile = numProfiles >= 2 && numProfiles < 3 ? 300 : 0; // Adds 5 minutes (300 seconds) for each extra profile (Max 2 Profiles)
  const additionalProfileTimeSmallGroup = numProfiles >= 3 && numProfiles < 4 ? 900 : 0; // Adds 15 minutes (900 seconds) for smaller groups (Max 3 Profiles)
  const additionalProfileTimeLargeGroup = numProfiles >= 4 && numProfiles <= 8 ? 1500 : 0; // Adds 25 minutes (1500 seconds) for larger groups (Max 4-8 Profiles)

  // Calculate the MinGameTime using the configured settings
  const clampedNumProfiles = Math.min(numProfiles, maxAllowedProfilesPerIP);
  const additionalTime = (clampedNumProfiles - 1) * additionalMinGameTimePerProfile + additionalProfileTimeSmallGroup + additionalProfileTimeLargeGroup;

  // Calculate the final minimum game time
  const minGameTime = defaultMinGameTime + additionalTime;

  return minGameTime;
}


/**
 * Validates the profile IP and numProfiles values, printing errors if necessary.
 *
 * @param {object} profileInArray - The profile information from profiles array.
 * @param {number} numProfiles - The number of profiles sharing the same IP address.
 */

function validateProfileIP (numProfiles) {
  const maxAllowedValue = 8; // Maximum number of allowed profiles per single IP address
  const minNotAllowed = 0; // Minimum allowed value for IP and numProfiles
  const profilesArray = Features.ProfilesPerIP.ProfilesArray;
  const profileInArray = profilesArray.find(profile => profile.ProfileName.toUpperCase() === me.profile.toUpperCase());

  let errorMsg = "";

  if (numProfiles > maxAllowedValue || numProfiles < minNotAllowed) {
    errorMsg = 
      (
        profileInArray
          ? "The value exceeds the allowable limits. For the profile " + profileInArray.ProfileName + ", which has an associated IP value of " + profileInArray.IP
          : "The value exceeds the allowable static limits."
      )
      + (numProfiles > maxAllowedValue 
          ? " The maximum allowable limit is " + maxAllowedValue + ". Using the default value of 3 minutes."
          : " The minimum allowable limit is 1. Using the default value of 3 minutes."
      );
  }

  if (errorMsg) {
    D2Bot.printToConsole(errorMsg, sdk.colors.D2Bot.Red);
  }
}

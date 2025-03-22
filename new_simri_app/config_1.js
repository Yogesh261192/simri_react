// const { withAndroidManifest } = require("@expo/config-plugins");

// const config_1 = (config) => {
//   return withAndroidManifest(config, async (config) => {
//     const androidManifest = config.modResults;

//     // Example: Add cleartext traffic permission
//     androidManifest.manifest.application[0].$["android:usesCleartextTraffic"] = "true";

//     return config;
//   });
// };

// module.exports = config_1;

const { withAndroidManifest } = require("@expo/config-plugins");

const config_1 = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;

    // Enable cleartext traffic
    androidManifest.manifest.application[0].$["android:usesCleartextTraffic"] = "true";

    // Ensure the required permissions exist in the AndroidManifest.xml
    const permissions = [
      "android.permission.INTERNET",
      "android.permission.ACCESS_FINE_LOCATION",
    ];

    permissions.forEach((permission) => {
      if (
        !androidManifest.manifest["uses-permission"]?.some(
          (p) => p.$["android:name"] === permission
        )
      ) {
        androidManifest.manifest["uses-permission"] = [
          ...(androidManifest.manifest["uses-permission"] || []),
          { $: { "android:name": permission } },
        ];
      }
    });

    return config;
  });
};

module.exports = config_1;

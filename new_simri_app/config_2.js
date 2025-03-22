const { withAndroidManifest } = require("@expo/config-plugins");

const withCustomAndroidPermissions = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;

    // Ensure the permissions exist in the AndroidManifest.xml
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

module.exports = withCustomAndroidPermissions;

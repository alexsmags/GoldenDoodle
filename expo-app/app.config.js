export default {
  expo: {
    name: "expo-app",
    slug: "expo-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.goldendoodle.expoapp",
      googleServicesFile: "./google-services-ios.plist", // Optional: if you want to include your plist as a separate file
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile: "./google-services-android.json", // Optional: if you want to include your google-services.json for Android
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      googleMapsApiKey: "AIzaSyBYvb6Sg2jIbSgu_ckcLfsUekS2-pS5mc8",
      firebase: {
        apiKey: "AIzaSyACmHbbXn58NyYXENuGPm_yfvZ13m2S17s",
        authDomain: "soen390-goldendoodle-minicap.firebaseapp.com", // Firebase auth domain
        projectId: "soen390-goldendoodle-minicap",
        storageBucket: "soen390-goldendoodle-minicap.appspot.com", // Firebase storage bucket
        messagingSenderId: "856311706393", // GCM Sender ID
        appId: "1:856311706393:ios:b4af4f3eb815fcb9a48b88", // Google App ID
        measurementId: "", // If you have Analytics enabled, add the measurement ID
      },
    },
  },
};

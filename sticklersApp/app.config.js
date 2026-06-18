export default {
  expo: {
    name: "Sticklers",
    slug: "sticklersApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/sticklers-logo.png",
    scheme: "sticklersapp",
    userInterfaceStyle: "dark",
    newArchEnabled: true,

    extra: {
      eas: {
        projectId: "b8f48c8e-b0dc-4965-a9cc-fe469a828a57",
      },
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.rferna25.sticklers",
    },
    android: {
      package: "com.rferna25.sticklers",
      adaptiveIcon: {
        backgroundColor: "#080808",
        foregroundImage: "./assets/sticklers-logo.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-community/datetimepicker",
      "expo-router",
      [    
        "expo-splash-screen",
        {
          image: "./assets/sticklers-logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};

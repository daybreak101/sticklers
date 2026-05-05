import Constants from "expo-constants";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = (() => {
//   try {
//     return initializeAuth(app, {
//       persistence: getReactNativePersistence(AsyncStorage),
//     });
//   } catch (e) {
//     // If already initialized, Firebase throws → fallback safe access
//     const { getAuth } = require("firebase/auth");
//     return getAuth(app);
//   }
// })();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);

export { db, storage };

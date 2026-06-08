import { seed as seedBreakfast } from "./seedBreakfast.js";
import { seed as seedHot } from "./seedHot.js";
import { seed as seedIced } from "./seedIced.js";
import { seed as seedSandwiches } from "./seedSandwiches.js";
import { seed as seedSoups } from "./seedSoup.js";
import { seed as seedBfModifiers } from "./seedBfModifiers.js";
import { seed as seedModifiers } from "./seedModifiers.js";
import { seed as seedSalad } from "./seedSalad.js";
import { seed as seedSchedule } from "./seedSchedule.js";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

await Promise.all([
  seedBreakfast(),
  seedHot(),
  seedIced(),
  seedSandwiches(),
  seedSoups(),
  seedBfModifiers(),
  seedModifiers(app, doc, setDoc, doc),
  seedSalad(),
  seedSchedule(),
]);

console.log("Seeding complete");

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

const businessInfo = {
  businessHours: [
    { open: null, close: null },
    { open: 600, close: 1500 },
    { open: 600, close: 1500 },
    { open: 600, close: 1500 },
    { open: 600, close: 1500 },
    { open: 600, close: 1500 },
    { open: null, close: null },
  ],
  tax: 0.091
};



export async function seed() {
  await setDoc(doc(db, "business", "businessInfo"), businessInfo);
  console.log("Schedule seeded");
}

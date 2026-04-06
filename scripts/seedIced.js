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

const iced = {
    id: "iced_coffee",
    name: "Iced Coffee",
    type: "single",
    items: [
      {
        id: "iced_coffee",
        name: "Iced Coffee",
        price: 0,
        status: "available",
      },
      {
        id: "iced_matcha",
        name: "Iced Matcha",
        price: 0,
        status: "available",
      },
      {
        id: "iced_americano",
        name: "Iced Americano",
        price: 0,
        status: "available",
      },
      {
        id: "iced_latte",
        name: "Iced Latte",
        price: 0,
        status: "available",
      },
      {
        id: "iced_london_fog",
        name: "Iced London Fog",
        price: 0,
            status: "available",
      },
      {
        id: "iced_mocha",
        name: "Iced Mocha",
        price: 0,
        status: "available",
      },
      {
        id: "iced_chai",
        name: "Iced Chai",
        price: 0,
        status: "available",
      },
      {
        id: "iced_macchiato",
        name: "Iced Macchiato",
        price: 0,
        status: "available",
      }
    ],
}

async function seed() {
  await setDoc(doc(db, "modifierGroups", "iced_coffee"), iced);
  console.log("Menu seeded");
}

seed();
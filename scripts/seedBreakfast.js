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

const breakfast = {
  name: "Breakfast",
  description: "Breakfast Menu. Ends at 10:30 AM",
  order: 30,
  items: [
    {
      itemId: "breakfast_sandwich",
      name: "Egg & Bagel Sandwich",
      basePrice: 7.25,
      modifierGroupIds: [
        "bagel",
        "egg",
        "breakfast_protein",
        "cheese",
        "breakfast_extras",
        "extras",
      ],
      defaults: {
        bagel: [],
        egg: ["Egg"],
        breakfast_protein: [],
        cheese: [],
        breakfast_extras: [],
        extras: [],
      },
      status: "available",
      order: 10,
    },
    {
      itemId: "mini_breakfast_sandwich",
      name: "Mini Breakfast Sandwich",
      basePrice: 5.55,
      modifierGroupIds: [
        "breakfast_protein",
        "egg",
        "cheese",
        "breakfast_extras",
        "extras",
      ],
      defaults: {
        breakfast_protein: [],
        egg: ["Egg"],
        cheese: [],
        breakfast_extras: [],
        extras: [],
      },
      status: "available",
      order: 20,
    },
  ],
};

async function seed() {
  await setDoc(doc(db, "menuCategories", "breakfast"), breakfast);
  console.log("Menu seeded");
}

seed();

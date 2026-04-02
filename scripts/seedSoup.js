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

const soups = {
  id: "soups",
  name: "Soups",
  description: "",
  order: 30,
  items: [
    {
      id: "veggie_soup",
      name: "Soup of the Day",
      description:
        "Todays soup of the day. 100% vegetarian. Served with Oyster Crackers.",
      price: 0,
      status: "available",
      sizes: [
        { id: "small", name: "Small", price: 4.85, status: "available" },
        { id: "large", name: "Large", price: 5.99, status: "available" },
      ],
      availability: "lunch_only",
      order: 10,
    },
    {
      id: "chicken_noodle_soup",
      name: "Chicken Noodle Soup",
      description: "Served with Oyster Crackers.",
      price: 0,
      status: "available",
      sizes: [
        { id: "small", name: "Small", price: 4.99, status: "available" },
        { id: "large", name: "Large", price: 6.66, status: "available" },
      ],
      availability: "lunch_only",
      order: 20,
    },
    {
      id: "homemade_chili",
      name: "Homemade Chili",
      description: "Served with Oyster Crackers.",
      price: 0,
      status: "available",
      sizes: [
        { id: "small", name: "Small", price: 5.9, status: "available" },
        { id: "large", name: "Large", price: 7.12, status: "available" },
      ],
      inlineModifierGroups: [
        {
          id: "chili_toppings",
          name: "Toppings",
          type: "multi",
          options: [
            { id: "onions", name: "Onions", price: 0 },
            { id: "cheddar", name: "Cheddar", price: 0 },
          ],
        },
      ],
      defaults: {
        chili_toppings: [],
      },
      availability: "lunch_only",
      order: 30,
    },
  ],
};

async function seed() {
  await setDoc(doc(db, "modifierGroups", "soups"), soups);
  console.log("Menu seeded");
}
seed();

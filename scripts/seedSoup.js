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
  name: "Soups",
  description: "Homemade soups from the kettle.",
  order: 30,
  image: "soups",
  items: [
    {
      itemId: "veggie_soup",
      name: "Soup of the Day",
      description:
        "Today's soup of the day. 100% vegetarian. Served with Oyster Crackers.",
      modifierGroupIds: ["soup_size"],
      defaults: {
        soup_size: ["small"],
      },
      pricingRules: {
        soup_size: {
          small: 4.85,
          large: 5.99,
        },
      },
      status: "available",
      availability: "lunch_only",
      order: 10,
      image: "soupOfTheDay"
    },
    {
      itemId: "chicken_noodle_soup",
      name: "Chicken Noodle Soup",
      description: "Served with Oyster Crackers.",
      modifierGroupIds: ["soup_size"],
      defaults: {
        soup_size: ["small"],
      },
      pricingRules: {
        soup_size: {
          small: 4.99,
          large: 6.66,
        },
      },
      status: "available",
      availability: "lunch_only",
      order: 20,
      image: "noodleSoup"
    },
    {
      itemId: "homemade_chili",
      name: "Homemade Chili",
      description: "Served with Oyster Crackers.",
      modifierGroupIds: ["soup_size", "chili_toppings"],
      defaults: {
        soup_size: ["small"],
        chili_toppings: [],
      },
      pricingRules: {
        soup_size: {
          small: 5.9,
          large: 7.12,
        },
      },
      status: "available",
      availability: "lunch_only",
      order: 30,
      image: "chili"
    },
  ],
};

const chiliToppingsModifiers = {
  id: "chili_toppings",
  name: "Toppings",
  type: "multi",
  priceType: "add",
  options: [
    { id: "onions", name: "Onions", price: 0, status: "available" },
    { id: "cheddar", name: "Cheddar", price: 0, status: "available" },
  ],
};

const soupSizeModifiers = {
  id: "soup_size",
  name: "Size",
  type: "single",
  priceType: "define",
  options: [
    {
      id: "small",
      name: "Small",
      price: 0,
      status: "available",
    },
    {
      id: "large",
      name: "Large",
      price: 0,
      status: "available",
    },
  ],
};

export async function seed() {
  await setDoc(doc(db, "menuCategories", "soups"), soups);
  await setDoc(doc(db, "modifierGroups", "soup_size"), soupSizeModifiers);
  await setDoc(doc(db, "modifierGroups", "chili_toppings"), chiliToppingsModifiers);
  console.log("Menu soups seeded");
}
//seed();

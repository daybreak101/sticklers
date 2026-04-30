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

const bagelModifiers = {
  id: "bagel",
  name: "Bagel",
  type: "single",
  priceType: "add",
  options: [
    {
      id: "plain",
      name: "Plain",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "wheat",
      name: "Wheat",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "sesame_seed",
      name: "Sesame Seed",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "onion",
      name: "Onion",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "everything",
      name: "Everything",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "jalapeno_cheddar",
      name: "Jalapeno Cheddar",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "asiago",
      name: "Asiago",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "cinna_raisin",
      name: "Cinnamon Raisin",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    { id: "croissant", name: "Croissant", price: 0, status: "available" },
    {
      id: "croissant_loaf",
      name: "Croissant Loaf",
      price: 0,
      status: "available",
    },
  ],
};

const creamCheeseModifiers = {
  id: "cream_cheese",
  name: "Cream Cheese",
  type: "single",
  priceType: "add",
  options: [
    { id: "cream_cheese", name: "Cream Cheese", price: 0, status: "available" },
    {
      id: "onion_cream_cheese",
      name: "Onions & Chives Cream Cheese",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "veggie_cream_cheese",
      name: "Veggie Cream Cheese",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "strawberry_cream_cheese",
      name: "Strawberry Cream Cheese",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
  ],
};

const breakfastProteinModifiers = {
  id: "breakfast_protein",
  name: "Meats",
  type: "multi",
  priceType: "add",
  options: [
    { id: "turkey", name: "Turkey", price: 0, status: "available" },
    { id: "ham", name: "Ham", price: 0, status: "available" },
    { id: "bacon", name: "Bacon", price: 0, status: "available" },
    {
      id: "pork_sausage",
      name: "Pork Sausage",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "turkey_sausage",
      name: "Turkey Sausage",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
  ],
};

const breakfastExtrasModifiers = {
  id: "breakfast_extras",
  name: "Extras",
  type: "multi",
  priceType: "add",
  options: [
    {
      id: "strawberry_jelly",
      name: "Strawberry Jelly",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "peanut_butter",
      name: "Peanut Butter",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "grape_jelly",
      name: "Grape Jelly",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
  ],
};

const breakfastSidesModifiers = {
  id: "breakfast_sides",
  name: "Breakfast Sides",
  type: "multi",
  priceType: "add",
  options: [
    {
      id: "hashbrown",
      name: "Hash Brown",
      price: 1.3,
      status: "available",
      availability: "breakfast_only",
    },
  ],
};

const oatmealToppingsModifiers = {
  id: "oatmeal_toppings",
  name: "Oatmeal Toppings",
  type: "multi",
  priceType: "add",
  options: [
    {
      id: "brown_sugar",
      name: "Brown Sugar",
      price: 0,
      status: "available",
    },
    {
      id: "raisins",
      name: "Raisins",
      price: 0,
      status: "available",
    },
    {
      id: "cranberries",
      name: "Cranberries",
      price: 0,
      status: "available",
    },
    {
      id: "walnuts",
      name: "Walnuts",
      price: 0,
      status: "available",
    },
    {
      id: "honey",
      name: "Honey",
      price: 0,
      status: "available",
    }
  ],
};

export async function seed() {
  await setDoc(doc(db, "modifierGroups", "bagel"), bagelModifiers);
  await setDoc(doc(db, "modifierGroups", "cream_cheese"), creamCheeseModifiers);
  await setDoc(
    doc(db, "modifierGroups", "breakfast_protein"),
    breakfastProteinModifiers,
  );
  await setDoc(
    doc(db, "modifierGroups", "breakfast_extras"),
    breakfastExtrasModifiers,
  );
  await setDoc(
    doc(db, "modifierGroups", "breakfast_sides"),
    breakfastSidesModifiers,
  );
  await setDoc(
    doc(db, "modifierGroups", "oatmeal_toppings"),
    oatmealToppingsModifiers,
  );
  console.log("Menu bf modifiers seeded");
}

//seed();

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

const hot = {
  name: "Hot Beverages",
  description:
    "Curated selection of coffees, teas, and comforting classics, served hot.",
  order: 50,
  image: "",
  items: [
    {
      itemId: "hot_matcha",
      name: "Hot Matcha",
      description: "Earthy Japanese green tea blended with steamed milk.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 4.5,
          medium: 5.1,
          large: 5.5,
        },
      },
      order: 50,
      status: "available",
    },
    {
      itemId: "hot_chocolate",
      name: "Hot Chocolate",
      description: "Velvety, steamed milk with a rich chocolate flavor.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 3.69,
          medium: 3.74,
          large: 4.78,
        },
      },
      status: "available",
      order: 10,
    },
    {
      itemId: "hot_water",
      name: "Hot Water",
      description: "Freshly heated water.",
      basePrice: 1.5,
      modifierGroupIds: [],
      defaults: {},
      status: "hidden",
      order: 120,
    },
    {
      itemId: "caffe_mocha",
      name: "Caffe Mocha",
      description: "Espresso with steamed milk and chocolate flavor.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 4.68,
          medium: 5.35,
          large: 6.29,
        },
      },
      status: "available",
      order: 30,
    },
    {
      itemId: "hot_chai",
      name: "Hot Chai Tea Latte",
      description:
        "Black tea infused with warming spices and blended with steamed milk.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 4.99,
          medium: 5.24,
          large: 5.88,
        },
      },
      status: "available",
      order: 40,
    },
    {
      itemId: "coffee",
      name: "Coffee",
      description:
        "Freshly brewed coffee with different roasts to choose from. Roasts include our House Coffee, French Roast, Decaf, and a rotating flavored roast.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 2.96,
          medium: 3.1,
          large: 3.74,
        },
      },
      status: "available",
      order: 10,
    },
    {
      itemId: "hot_macchiato",
      name: "Hot Macchiato",
      description: "Espresso with steamed milk topped with caramel drizzle.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 4.78,
          medium: 5.3,
          large: 5.9,
        },
      },
      status: "available",
      order: 80,
    },
    {
      itemId: "caffe_latte",
      name: "Caffe Latte",
      description: "Espresso with steamed milk.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 3.95,
          medium: 4.8,
          large: 5.6,
        },
      },
      status: "available",
      order: 20,
    },
    {
      itemId: "cappuccino",
      name: "Cappuccino",
      description:
        "Hot beverage composed of equal parts espresso, steamed milk, and milk foam.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 3.95,
          medium: 5.25,
          large: 6.08,
        },
      },
      status: "available",
      order: 60,
    },
    {
      itemId: "espresso",
      name: "Espresso",
      description: "A single shot of espresso.",
      modifierGroupIds: ["espresso_shots"],
      defaults: {
        hot_coffee_size: ["single"],
      },
      pricingRules: {
        espresso_shots: {
          single: 2.6,
          double: 3.54,
        },
      },
      status: "available",
      order: 110,
    },
    {
      itemId: "americano",
      name: "Americano",
      description: "Espresso diluted with hot water.",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      status: "available",
      pricingRules: {
        hot_coffee_size: {
          small: 3.25,
          medium: 3.85,
          large: 4.1,
        },
      },
      order: 70,
    },
    {
      itemId: "hot_london_fog",
      name: "Hot London Fog",
      description: "Earl Grey tea with steamed milk and a hint of vanilla.",
      status: "available",
      modifierGroupIds: ["hot_coffee_size"],
      defaults: {
        hot_coffee_size: ["medium"],
      },
      pricingRules: {
        hot_coffee_size: {
          small: 3.9,
          medium: 4.58,
          large: 5.9,
        },
      },
      order: 90,
    },
  ],
};

const hotCoffeeModifiers = {
  id: "hot_coffee_size",
  name: "Size",
  type: "single",
  priceType: "define",
  options: [
    { id: "small", name: "Small", price: 0 },
    { id: "medium", name: "Medium", price: 0 },
    { id: "large", name: "Large", price: 0 },
  ],
};

const espressoShotsModifiers = {
  id: "espresso_shots",
  name: "Espresso Shots",
  type: "single",
  priceType: "define",
  options: [
    { id: "single", name: "Single", price: 0 },
    { id: "double", name: "Double", price: 0 },
  ],
};

async function seed() {
  await setDoc(doc(db, "menuCategories", "hot_coffee"), hot);
  await setDoc(doc(db, "modifierGroups", "espresso_shots"), espressoShotsModifiers);
  await setDoc(doc(db, "modifierGroups", "hot_coffee_size"), hotCoffeeModifiers);
  console.log("Menu seeded");
}

seed();

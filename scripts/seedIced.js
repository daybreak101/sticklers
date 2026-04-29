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
  name: "Iced Coffee",
  description:
    "Refreshing lineup of chilled coffees, teas, and café favorites—served over ice for a smooth, cooling finish.",
  type: "single",
  order: 60,
  image: "icedCoffee",
  items: [
    {
      itemId: "iced_coffee",
      name: "Iced Coffee",
      description: "Iced cold brew coffee.",
      price: 0,
      status: "available",
      order: 10,
    },
    {
      itemId: "iced_matcha",
      name: "Iced Matcha",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 50,
      status: "available",
    },
    {
      itemId: "iced_americano",
      name: "Iced Americano",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 70,
      status: "available",
    },
    {
      itemId: "iced_latte",
      name: "Iced Latte",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 20,
      status: "available",
    },
    {
      itemId: "iced_london_fog",
      name: "Iced London Fog",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 90,
      status: "available",
    },
    {
      itemId: "iced_mocha",
      name: "Iced Mocha",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 30,
      status: "available",
    },
    {
      itemId: "iced_chai",
      name: "Iced Chai Tea Latte",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 40,
      status: "available",
    },
    {
      itemId: "iced_macchiato",
      name: "Iced Macchiato",
      description: "Earthy Japanese green tea stirred with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.5,
          large: 5.1,
          x_large: 5.5,
        },
      },
      order: 80,
      status: "available",
    },
  ],
};

async function seed() {
  await setDoc(doc(db, "menuCategories", "iced_coffee"), iced);
  console.log("Menu seeded");
}

seed();

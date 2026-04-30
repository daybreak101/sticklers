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
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 3.95,
          large: 4.94,
          x_large: 6.76,
        },
      },
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
          small: 5.1,
          large: 5.7,
          x_large: 7.18,
        },
      },
      order: 50,
      status: "available",
    },
    {
      itemId: "iced_americano",
      name: "Iced Americano",
      description: "Espresso diluted with cold water served over ice.",
      modifierGroupIds: ["iced_coffee_size", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 3.95,
          large: 4.94,
          x_large: 6.76,
        },
      },
      order: 70,
      status: "available",
    },
    {
      itemId: "iced_latte",
      name: "Iced Latte",
      description: "Espresso with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 5.8,
          large: 6.27,
          x_large: 7.49,
        },
      },
      order: 20,
      status: "available",
    },
    {
      itemId: "iced_london_fog",
      name: "Iced London Fog",
      description: "Earl Grey tea with a hint of vanilla combined with cold milk over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 4.99,
          large: 6.03,
          x_large: 6.80,
        },
      },
      order: 90,
      status: "available",
    },
    {
      itemId: "iced_mocha",
      name: "Iced Mocha",
      description: "Espresso, chocolate and cold milk served over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "mocha", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        mocha: ["chocolate"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 5.8,
          large: 6.27,
          x_large: 7.49,
        },
      },
      order: 30,
      status: "available",
    },
    {
      itemId: "iced_chai",
      name: "Iced Chai Tea Latte",
      description: "Spiced black tea combined with cold milk poured over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 5.46,
          large: 6.10,
          x_large: 7.07,
        },
      },
      order: 40,
      status: "available",
    },
    {
      itemId: "iced_macchiato",
      name: "Iced Macchiato",
      description: "Layered espresso over cold milk served over ice.",
      modifierGroupIds: ["iced_coffee_size", "milk", "syrup", "coffee_extras"],
      defaults: {
        iced_coffee_size: ["large"],
        milk: ["whole"],
        syrup: [],
        coffee_extras: [],
      },
      pricingRules: {
        iced_coffee_size: {
          small: 5.67,
          large: 6.23,
          x_large: 7.29,
        },
      },
      order: 80,
      status: "available",
    },
  ],
};

export async function seed() {
  await setDoc(doc(db, "menuCategories", "iced_coffee"), iced);
  console.log("Menu iced seeded");
}

//seed();

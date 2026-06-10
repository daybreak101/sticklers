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
  availability: {
    startTime: 600,
    endTime: 1030,
  },
  items: [
    {
      itemId: "breakfast_sandwich",
      name: "Egg & Bagel Sandwich",
      description: "Egg & Bagel Sandwich, with your choice of meat and cheese.",
      basePrice: 7.25,
      modifierGroupIds: ["bagel", "breakfast_protein", "cheese", "extras"],
      defaults: {
        bagel: ["plain"],
        breakfast_protein: [],
        cheese: [],
        extras: [],
      },
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 10,
    },
    {
      itemId: "mini_breakfast_sandwich",
      name: "Mini Breakfast Sandwich",
      description:
        "Mini Breakfast Sandwich, with egg and your choice of meat and cheese.",
      basePrice: 5.55,
      modifierGroupIds: ["breakfast_protein", "cheese", "extras"],
      defaults: {
        breakfast_protein: [],
        cheese: [],
        extras: [],
      },
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 20,
    },
    {
      itemId: "spread_bagel",
      name: "Bagel with Spread",
      description:
        "Bagel with your choice of spread. Choose from cream cheeses, peanut butter, jelly, etc.",
      basePrice: 4.5,
      modifierGroupIds: ["bagel", "spreads"],
      defaults: {
        bagel: ["plain"],
        spreads: ["cream_cheese"],
      },
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 30,
    },
    {
      itemId: "breakfast_burrito",
      name: "Breakfast Burrito",
      description:
        "Breakfast Burrito, with egg and your choice of meat and cheese. Additional charge for hash brown.",
      basePrice: 7.8,
      modifierGroupIds: [
        "breakfast_protein",
        "cheese",
        "extras",
        "hashbrown",
      ],
      defaults: {
        breakfast_protein: [],
        cheese: [],
        extras: [],
        hashbrown: [],
      },
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 50,
    },
    {
      itemId: "breakfast_bowl",
      name: "Breakfast Bowl",
      description:
        "Breakfast Bowl with egg and your choice of meat and cheese.",
      basePrice: 8.0,
      modifierGroupIds: [
        "breakfast_protein",
        "cheese",
        "extras",
        "hashbrown",
      ],
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      defaults: {
        breakfast_protein: [],
        cheese: [],
        extras: [],
        hashbrown: [],
      },
      status: "available",
      order: 60,
    },
    {
      itemId: "hb_bowl",
      name: "Hashbowl",
      description:
        "Bowl with hashbrowns along with your choice of meat and cheese.",
      basePrice: 6.5,
      modifierGroupIds: [
        "breakfast_protein",
        "cheese",
        "extras",
      ],
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      defaults: {
        breakfast_protein: [],
        cheese: [],
        extras: [],
      },
      status: "available",
      order: 70,
    },
    {
      itemId: "breakfast_quesadilla",
      name: "Breakfast Quesadilla",
      description:
        "Quesadilla with hash browns, along with your choice of meat and cheese.",
      basePrice: 8.99,
      modifierGroupIds: [
        "breakfast_protein",
        "cheese",
        "extras",
      ],
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      defaults: {
        breakfast_protein: [],
        cheese: [],
        extras: [],
      },
      status: "available",
      order: 80,
    },
    {
      itemId: "bct",
      name: "BCT",
      description: "Bagel with bacon, cream cheese and tomatoes.",
      basePrice: 5.95,
      modifierGroupIds: [
        "bagel",
        "breakfast_protein",
        "spreads",
        "cheese",
        "extras",
      ],
      defaults: {
        bagel: [],
        breakfast_protein: ["bacon"],
        spreads: ["cream_cheese"],
        cheese: [],
        extras: ["tomato"],
      },
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
      },
      status: "available",
      order: 90,
    },
    {
      itemId: "oatmeal",
      name: "Quaker Oats Oatmeal",
      description: "Quaker Oats Oatmeal with optional brown sugar and raisins.",
      basePrice: 3.9,
      modifierGroupIds: ["soup_size", "oatmeal_toppings"],
      defaults: {
        soup_size: ["small"],
        oatmeal_toppings: ["brown_sugar", "raisins"],
      },
      status: "available",
      order: 100,
    },
    {
      itemId: "hashbrown",
      name: "Hash Brown",
      description: "Side of hash brown.",
      basePrice: 1.3,
      status: "available",
      order: 110,
    },
    {
      itemId: "loaded_hashbrown",
      name: "Loaded Hash Brown",
      description: "Side of hash brown topped with cheddar and green peppers.",
      basePrice: 2.5,
      status: "available",
      order: 111,
    },
    {
      itemId: "english_muffin",
      name: "English Muffin with Spread",
      description: "English Muffin served with your choice of spread. Choose from cream cheeses, peanut butter, jelly, etc.",
      basePrice: 2.31,
      modifierGroupIds: ["spreads"],
      defaults: {
        spreads: ["no_spread"],
      },
      status: "available",
      order: 130,
    },
    {
      itemId: "cool_bird",
      name: "The Cool Bird",
      description: "Bagel with cream cheese, cucumber, jelly, and turkey.",
      basePrice: 6.5,
      modifierGroupIds: [
        "breakfast_protein",
        "cream_cheese",
        "cheese",
        "breakfast_extras",
        "extras",
        "breakfast_sides",
      ],
      pricingRules: {
        protein: {
          includedCount: 1,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      defaults: {
        breakfast_protein: ["turkey"],
        cream_cheese: ["cream_cheese"],
        cheese: [],
        breakfast_extras: ["strawberry_jelly"],
        extras: ["cucumber"],
        breakfast_sides: [],
      },
      status: "available",
      order: 140,
    },
    {
      itemId: "avo_toast",
      name: "Avocado Toast",
      description: "Avocado spread on your choice of bagel, topped with tomato and Everything seasoning.",
      basePrice: 4.5,
      pricingRules: {
        protein: {
          includedCount: 0,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 0,
          extraItemPrice: 1,
        },
      },
      modifierGroupIds: [
        "bagel",
        "breakfast_protein",
        "cheese",
        "extras",
      ],
      defaults: {
        bagel: [],
        breakfast_protein: [],
        cheese: [],
        extras: ["tomato", "avocado"],
      },
      status: "available",
      order: 150,
    },
    {
      itemId: "rice_pudding",
      name: "Arroz con Leche",
      description: "Rice pudding.",
      basePrice: 4.2,
      modifierGroupIds: ["oatmeal_toppings"],
      defaults: {
        oatmeal_toppings: ["cinnamon"],
      },
      status: "available",
      order: 160,
    },
  ],
};

export async function seed() {
  await setDoc(doc(db, "menuCategories", "breakfast"), breakfast);
  console.log("Menu breakfast seeded");
}

//seed();

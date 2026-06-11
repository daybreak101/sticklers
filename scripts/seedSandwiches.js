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

const sandwiches = {
  name: "Oven Toasted Sandwich",
  description:
    "Sandwiches are Served Oven Toasted on Freshly Baked French or Whole Wheat rolls with Mayo, Spicy Brown Mustard, Hot Peppers, Lettuce, Tomato, Onion, Pickles, Oil and Italian Seasonings",
  order: 0,
  image: "sandwiches",
  items: [
    {
      itemId: "tba_sandwich",
      name: "Turkey Bacon Avocado",
      description:
        "Lean Pan-Roasted Turkey Breast, Bacon, Fresh Avocado & Swiss Cheese with your choice of toppings.",
      basePrice: 11.8,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["turkey", "bacon"],
        cheese: ["swiss"],
        extras: ["avocado"],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 2,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 10,
      image: "tba"
    },
    {
      itemId: "ty_sandwich",
      name: "Turkey Breast",
      description:
        "99% Lean, Pan Roasted Turkey Breast & Swiss Cheese with your choice of toppings.",
      basePrice: 10.85,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["turkey"],
        cheese: ["swiss"],
        extras: [],
        bread: ["french"],
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
      image: "turkey"
    },
    {
      itemId: "h_sandwich",
      name: "Honey Baked Ham",
      description: "98% lean honey baked ham and Swiss.",
      basePrice: 10.85,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["ham"],
        cheese: ["swiss"],
        extras: [],
        bread: ["french"],
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
      image: "ham"
    },
    {
      itemId: "tj_sandwich",
      name: "Traffic Jam",
      description:
        "Hard Salami, Turkey Breast, Honey Baked Ham, Roast Beef & Swiss.",
      basePrice: 11.2,
      modifierGroupIds: ["bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["salami", "turkey", "ham", "roast_beef"],
        cheese: ["swiss"],
        extras: [],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 4,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 40,
      image: "trafficJam",
    },
    {
      itemId: "itl_sandwich",
      name: "Italian",
      description:
        "Spicy Capicola, Mortadella, Hard Salami, Pepperoni & Provolone.",
      basePrice: 11.2,
      modifierGroupIds: ["bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["salami", "mortadella", "pepperoni", "capicola"],
        cheese: ["provolone"],
        extras: [],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 4,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 50,
      image: "italian"
    },
    {
      itemId: "mb_sandwich",
      name: "Meatball",
      description:
        "Four Meatballs & Marinara & Provolone. (Three Meatballs for Half-Sandwich)",
      basePrice: 9.99,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["meatballs"],
        cheese: ["provolone"],
        extras: ["marinara"],
        bread: ["french"],
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
      order: 60,
      image: "meatball"
    },
    {
      itemId: "blt_sandwich",
      name: "BLT",
      description: "Bacon, Lettuce, Tomato & Swiss",
      basePrice: 9.99,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["bacon"],
        cheese: ["swiss"],
        extras: ["lettuce", "tomato"],
        bread: ["french"],
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
      order: 70,
      image: "blt"
    },
    {
      itemId: "rb_sandwich",
      name: "Roast Beef",
      description: "97% Lean, Oven Roasted Black Angus Beef & Provolone.",
      basePrice: 11.0,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["roast_beef"],
        cheese: ["provolone"],
        extras: [],
        bread: ["french"],
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
      order: 80,
      image: "roastBeef"
    },
    {
      itemId: "tuna_sandwich",
      name: "Tuna Salad",
      description: "Albacore Tuna, Celery, Mayo, Seasoning & Swiss.",
      basePrice: 10.85,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["tuna"],
        cheese: ["swiss"],
        extras: [],
        bread: ["french"],
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
      order: 90,
      image: "tuna"
    },
    {
      itemId: "cs_sandwich",
      name: "Chicken Salad",
      description:
        "All-Natural White Meat Chicken, Celery, Mayo, Seasoning & Provolone.",
      basePrice: 9.99,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["chicken_salad"],
        cheese: ["provolone"],
        extras: [],
        bread: ["french"],
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
      order: 100,
      image: "chickenSalad"
    },
    {
      itemId: "veggie_sandwich",
      name: "Vegetarian",
      description:
        "Green Peppers, Mushrooms, Swiss, Provolone & American Cheese.",
      basePrice: 9.1,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: [],
        cheese: ["swiss", "provolone", "american"],
        extras: ["green_peppers", "mushrooms"],
        bread: ["French"],
      },
      pricingRules: {
        protein: {
          includedCount: 0,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 3,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 110,
      image: "veggie"
    },
    {
      itemId: "tcb_sandwich",
      name: "Turkey Cheddar Bacon",
      description: "99% Lean Pan-Roasted Turkey Breast, Cheddar & Bacon.",
      basePrice: 11.8,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["turkey", "bacon"],
        cheese: ["cheddar"],
        extras: [],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 2,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 120,
      image: "tcb"
    },
    {
      itemId: "cbr_sandwich",
      name: "Chicken Bacon Ranch",
      description: "All-Natural White Meat Chicken, Bacon, Ranch & Cheddar.",
      basePrice: 10.5,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["chicken", "bacon"],
        cheese: ["cheddar"],
        extras: ["ranch"],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 2,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 130,
      image: "chickenBaconRanch"
    },
    {
      itemId: "buff_sandwich",
      name: "Chicken Buffalo",
      description:
        "All-Natural White Meat Chicken with Buffalo Sauce and Cheddar.",
      basePrice: 10.5,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["chicken"],
        cheese: ["cheddar"],
        extras: ["buffalo"],
        bread: ["french"],
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
      order: 140,
      image: "buffalo"
    },
    {
      itemId: "pas_sandwich",
      name: "Pastrami",
      description: "Pastrami and Swiss.",
      basePrice: 10.1,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["pastrami"],
        cheese: ["swiss"],
        extras: [],
        bread: ["french"],
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
      order: 150,
      image: "pastrami"
    },
    {
      itemId: "az_sandwich",
      name: "Arizona Club",
      description: "Chicken Salad, Bacon, Avocado and Pepper Jack Cheese",
      basePrice: 11.8,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["chicken_salad", "bacon"],
        cheese: ["pepper_jack"],
        extras: ["avocado"],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 2,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 160,
      image: "azClub"
    },
    {
      itemId: "blta_sandwich",
      name: "BLT Avocado",
      description: "Bacon, Lettuce, Tomato, Avocado & Swiss",
      basePrice: 10.99,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["bacon"],
        cheese: ["swiss"],
        extras: ["lettuce", "tomato", "avocado"],
        bread: ["french"],
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
      order: 170,
      image: "blta"
    },
    {
      itemId: "gc_sandwich",
      name: "Grilled Cheese",
      description: "Classic Melted Cheddar Cheese Sandwich",
      basePrice: 5.75,
      modifierGroupIds: ["bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: [],
        cheese: ["cheddar"],
        extras: [],
        bread: ["french"],
      },
      pricingRules: {
        protein: {
          includedCount: 0,
          extraItemPrice: 1.94,
        },
      },
      status: "available",
      order: 180,
      image: "grilledCheese"
    },
    {
      itemId: "parm_sandwich",
      name: "Chicken Parm",
      description:
        "All-Natural White Meat Chicken with Marinara Sauce and Provolone",
      basePrice: 5.75,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: ["chicken"],
        cheese: ["provolone"],
        extras: ["marinara"],
        bread: ["french"],
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
      order: 190,
      image: "chickenParm"
    },
    {
      itemId: "pick2_sandwich",
      name: "Pick Two!",
      description:
        "Pick Two Meats: Turkey, Honey Baked Ham, Roast Beef, and/or Hard Salami with Provolone.",
      basePrice: 10.85,
      modifierGroupIds: ["size", "bread", "protein", "cheese", "extras"],
      defaults: {
        size: ["full"],
        protein: [],
        cheese: ["provolone"],
        extras: [],
        bread: ["french"],
      },
      constraints: {
        protein: {
          minSelect: 2,
          maxSelect: null,
        },
      },
      pricingRules: {
        protein: {
          includedCount: 2,
          extraItemPrice: 1.94,
        },
        cheese: {
          includedCount: 1,
          extraItemPrice: 1,
        },
      },
      status: "available",
      order: 200,
      image: "pick2"
    },
  ],
};

export async function seed() {
  await setDoc(doc(db, "menuCategories", "sandwiches"), sandwiches);
  console.log("Menu sandwiches seeded");
}

//seed();

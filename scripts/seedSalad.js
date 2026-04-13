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

const salads = {
  name: "Salads",
  description: "Salads are a great way to start your day.",
  order: 10,
  image: "salads",
  items: [
    {
      itemId: "sm_salad",
      name: "Small Greens Salad",
      description:
        "Your Choice of Five Toppings and One Dressing Additional Toppings $0.80 / Extra Dressing $0.55. Add Sliced Meat, Chicken Salad or Tuna $3.09.",
      basePrice: 8.99,
      modifierGroupIds: [
        "greens",
        "salad_toppings",
        "salad_protein",
        "dressing",
      ],
      pricingRules: {
        salad_toppings: {
          includedCount: 5,
          extraItemPrice: 0.8,
        },
        dressing: {
          includedCount: 1,
          extraItemPrice: 0.55,
        },
        salad_protein: {
          includedCount: 0,
          extraItemPrice: 3.09,
        },
      },
      status: "available",
      order: 10,
    },
    {
      itemId: "lg_salad",
      name: "Large Greens Salad",
      description: "A choice of greens, unlimited toppings and 2 dressings.",
      basePrice: 11.99,
      modifierGroupIds: [
        "greens",
        "salad_toppings",
        "salad_protein",
        "dressing",
      ],
      pricingRules: {
        salad_toppings: {
          unlimited: true
        },
        dressing: {
          includedCount: 2,
          extraItemPrice: 0.55,
        },
        salad_protein: {
          includedCount: 0,
          extraItemPrice: 3.09,
        },
        status: "available",
        order: 20,
      },
    },
  ],
};

async function seed() {
  await setDoc(doc(db, "menuCategories", "salads"), salads);
  console.log("Menu seeded");
}

seed();

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
  id: "hot_matcha",
  name: "Hot Matcha",
  type: "single",
  items: [
    {
      id: "hot_matcha",
      name: "Hot Matcha",
      description: "",
      sizes: [
        { id: "small", name: "Small", price: 4.5, status: "available" },
        { id: "medium", name: "Medium", price: 5.1, status: "available" },
        { id: "large", name: "Large", price: 5.5, status: "available" },
      ],
      status: "available",
    },
    {
      id: "hot_chocolate",
      name: "Hot Chocolate",
      sizes: [
        { id: "small", name: "Small", price: 3.69, status: "available" },
        { id: "medium", name: "Medium", price: 3.74, status: "available" },
        { id: "large", name: "Large", price: 4.78, status: "available" },
      ],
      status: "available",
    },
    {
      id: "hot_water",
      name: "Hot Water",
      price: 1.5,
      status: "available",
    },
    {
      id: "caffe_mocha",
      name: "Caffe Mocha",
      sizes: [
        { id: "small", name: "Small", price: 4.68, status: "available" },
        { id: "medium", name: "Medium", price: 5.35, status: "available" },
        { id: "large", name: "Large", price: 6.29, status: "available" },
      ],
      status: "available",
    },
    {
      id: "hot_chai",
      name: "Hot Chai Tea Latte",
      sizes: [
        { id: "small", name: "Small", price: 4.99, status: "available" },
        { id: "medium", name: "Medium", price: 5.24, status: "available" },
        { id: "large", name: "Large", price: 5.88, status: "available" },
      ],
      status: "available",
    },
    {
      id: "coffee",
      name: "Coffee",
      sizes: [
        { id: "small", name: "Small", price: 2.96, status: "available" },
        { id: "medium", name: "Medium", price: 3.1, status: "available" },
        { id: "large", name: "Large", price: 3.74, status: "available" },
      ],
      status: "available",
    },
    {
      id: "hot_macchiato",
      name: "Hot Macchiato",
      sizes: [
        { id: "small", name: "Small", price: 4.78, status: "available" },
        { id: "medium", name: "Medium", price: 5.3, status: "available" },
        { id: "large", name: "Large", price: 5.9, status: "available" },
      ],
      status: "available",
    },
    {
      id: "caffe_latte",
      name: "Caffe Latte",
      sizes: [
        { id: "small", name: "Small", price: 3.95, status: "available" },
        { id: "medium", name: "Medium", price: 4.8, status: "available" },
        { id: "large", name: "Large", price: 5.6, status: "available" },
      ],
      status: "available",
    },
    {
      id: "cappuccino",
      name: "Cappuccino",
      sizes: [
        { id: "small", name: "Small", price: 3.95, status: "available" },
        { id: "medium", name: "Medium", price: 5.25, status: "available" },
        { id: "large", name: "Large", price: 6.08, status: "available" },
      ],
      status: "available",
    },
    {
      id: "espresso",
      name: "Espresso",
      sizes: [
        { id: "single", name: "Single", price: 2.60, status: "available" },
        { id: "double", name: "Double", price: 3.54, status: "available" },
      ],
      status: "available",
    },
    {
      id: "americano",
      name: "Americano",
      price: 0,
      status: "available",
    },
    {
      id: "hot_london_fog",
      name: "Hot London Fog",
      price: 0,
      status: "available",
    },
  ],
};

async function seed() {
  await setDoc(doc(db, "modifierGroups", "hot_coffee"), hot);
  console.log("Menu seeded");
}

seed();

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

const breadModifiers = {
  id: "bread",
  name: "Bread",
  type: "single",
  options: [
    {
      id: "french",
      name: "French",
      price: 0,
      status: "available",
    },
    {
      id: "wheat",
      name: "Wheat",
      price: 0,
      status: "available",
    },
    {
      id: "gluten_free",
      name: "Gluten-Free",
      price: 0,
      status: "available",
    },
    {
      id: "spinach_wrap",
      name: "Spinach Wrap",
      price: 0,
      status: "available",
    },
    {
      id: "croissant",
      name: "Croissant",
      price: 0,
      status: "available",
    },
    {
      id: "croissant_loaf",
      name: "Croissant Loaf",
      price: 0,
      status: "available",
    },
    {
      id: "flatbread",
      name: "Flatbread",
      price: 0,
      status: "available",
    },
  ],
};

const sizeModifiers = {
  id: "size",
  name: "Size",
  type: "single",
  priceType: "override",
  options: [
    { id: "full", name: "Full", price: null, status: "available" },
    {
      id: "half",
      name: "Half",
      price: 7.05,
      status: "available",
      allowedBread: ["french", "wheat"],
    },
  ],
};

const proteinModifiers = {
  id: "protein",
  name: "Meats",
  type: "multi",
  priceType: "add",
  options: [
    { id: "turkey", name: "Turkey", price: 0, status: "available" },
    { id: "ham", name: "Ham", price: 0, status: "available" },
    { id: "roast_beef", name: "Roast Beef", price: 0, status: "available" },
    { id: "bacon", name: "Bacon", price: 0, status: "available" },
    { id: "tuna", name: "Tuna", price: 0, status: "available" },
    {
      id: "chicken_salad",
      name: "Chicken Salad",
      price: 0,
      status: "available",
    },
    { id: "chicken", name: "Chicken", price: 0, status: "available" },
    { id: "pastrami", name: "Pastrami", price: 0, status: "available" },
    { id: "salami", name: "Salami", price: 0, status: "available" },
    { id: "meatballs", name: "Meatballs", price: 0, status: "available" },
    { id: "mortadella", name: "Mortadella", price: 0, status: "available" },
    { id: "pepperoni", name: "Pepperoni", price: 0, status: "available" },
    { id: "capicola", name: "Capicola", price: 0, status: "available" },
    {
      id: "boiled_eggs",
      name: "Boiled Eggs",
      price: 1.99,
      status: "available",
    },
  ],
};

const cheeseModifiers = {
  id: "cheese",
  name: "Cheese",
  type: "single",
  priceType: "add",
  options: [
    { id: "swiss", name: "Swiss", price: 0, status: "available" },
    { id: "provolone", name: "Provolone", price: 0, status: "available" },
    { id: "cheddar", name: "Cheddar", price: 0, status: "available" },
    { id: "pepper_jack", name: "Pepper Jack", price: 0, status: "available" },
    { id: "american", name: "American", price: 0, status: "available" },
    { id: "feta", name: "Feta", price: 0, status: "available" },
  ],
};

const extrasModifiers = {
  id: "extras",
  name: "Toppings/Extras",
  type: "multi",
  priceType: "add",
  options: [
    { id: "mayo", name: "Mayo", price: 0, status: "available" },
    {
      id: "spicy_brown_mustard",
      name: "Spicy Brown Mustard",
      price: 0,
      status: "available",
    },
    { id: "hot_peppers", name: "Hot Peppers", price: 0, status: "available" },
    { id: "lettuce", name: "Lettuce", price: 0, status: "available" },
    { id: "tomato", name: "Tomato", price: 0, status: "available" },
    { id: "onions", name: "Onions", price: 0, status: "available" },
    { id: "pickles", name: "Pickles", price: 0, status: "available" },
    { id: "oil", name: "Oil", price: 0, status: "available" },
    {
      id: "italian_seasoning",
      name: "Italian Seasonings",
      price: 0,
      status: "available",
    },
    { id: "avocado", name: "Avocado", price: 1.49, status: "available" },
    { id: "peperoncini", name: "Peperoncini", price: 0, status: "available" },
    { id: "sauerkraut", name: "Sauerkraut", price: 0, status: "available" },
    { id: "marinara", name: "Marinara", price: 0, status: "available" },
    { id: "buffalo", name: "Buffalo", price: 0, status: "available" },
    {
      id: "green_peppers",
      name: "Green Peppers",
      price: 0.89,
      status: "available",
    },
    { id: "mushrooms", name: "Mushrooms", price: 0.89, status: "available" },
    { id: "ranch", name: "Ranch", price: 0, status: "available" },
    {
      id: "sriracha_mayo",
      name: "Sriracha Mayo",
      price: 0.5,
      status: "available",
    },
  ],
};

const greensModifiers = {
  id: "greens",
  name: "Greens",
  type: "multi",
  priceType: "add",
  options: [
    { id: "romaine", name: "Romaine", price: 0, status: "available" },
    { id: "spring_mix", name: "Spring Mix", price: 0, status: "available" },
  ],
};

const saladToppingsModifiers = {
  id: "salad_toppings",
  name: "Toppings",
  type: "multi",
  priceType: "add",
  options: [
    { id: "cucumber", name: "Cucumber", price: 0, status: "available" },
    {
      id: "cherry_tomatoes",
      name: "Cherry Tomatoes",
      price: 0,
      status: "available",
    },
    { id: "carrots", name: "Carrots", price: 0, status: "available" },
    { id: "zucchini", name: "Zucchini", price: 0, status: "available" },
    {
      id: "green_peppers",
      name: "Green Peppers",
      price: 0,
      status: "available",
    },
    { id: "celery", name: "Celery", price: 0, status: "available" },
    { id: "hot_peppers", name: "Hot Peppers", price: 0, status: "available" },
    { id: "baby_corn", name: "Baby Corn", price: 0, status: "available" },
    { id: "onions", name: "Onions", price: 0, status: "available" },
    { id: "broccoli", name: "Broccoli", price: 0, status: "available" },
    { id: "cauliflower", name: "Cauliflower", price: 0, status: "available" },
    { id: "mushrooms", name: "Mushrooms", price: 0, status: "available" },
    {
      id: "garbanzo_beans",
      name: "Garbanzo Beans",
      price: 0,
      status: "available",
    },
    { id: "peas", name: "Peas", price: 0, status: "available" },
    { id: "black_olives", name: "Black Olives", price: 0, status: "available" },
    {
      id: "artichoke_hearts",
      name: "Artichoke Hearts",
      price: 0,
      status: "available",
    },
    { id: "radish", name: "Radish", price: 0, status: "available" },

    { id: "bacon_bits", name: "Bacon Bits", price: 0, status: "available" },
    { id: "pepperoni", name: "Pepperoni", price: 0, status: "available" },
    { id: "boiled_eggs", name: "Boiled Eggs", price: 0, status: "available" },

    { id: "feta", name: "Feta", price: 0, status: "available" },
    {
      id: "cottage_cheese",
      name: "Cottage Cheese",
      price: 0,
      status: "available",
    },

    { id: "cheddar", name: "Cheddar", price: 0, status: "available" },
    { id: "swiss", name: "Swiss", price: 0, status: "available" },
    { id: "provolone", name: "Provolone", price: 0, status: "available" },
    { id: "pepper_jack", name: "Pepper Jack", price: 0, status: "available" },

    {
      id: "sunflower_seeds",
      name: "Sunflower Seeds",
      price: 0,
      status: "available",
    },
    { id: "raisins", name: "Raisins", price: 0, status: "available" },
    { id: "cranberries", name: "Cranberries", price: 0, status: "available" },
    {
      id: "chow_mein_noodles",
      name: "Chow Mein Noodles",
      price: 0,
      status: "available",
    },
    { id: "croutons", name: "Croutons", price: 0, status: "available" },
  ],
};

const saladProteinModifiers = {
  id: "salad_protein",
  name: "Protein",
  type: "multi",
  priceType: "add",
  options: [
    { id: "turkey", name: "Turkey", price: 0, status: "available" },
    { id: "ham", name: "Ham", price: 0, status: "available" },
    { id: "roast_beef", name: "Roast Beef", price: 0, status: "available" },
    { id: "tuna", name: "Tuna", price: 0, status: "available" },
    {
      id: "chicken_salad",
      name: "Chicken Salad",
      price: 0,
      status: "available",
    },
    { id: "chicken", name: "Chicken", price: 0, status: "available" },
    { id: "pastrami", name: "Pastrami", price: 0, status: "available" },
  ],
};

const dressingModifiers = {
  id: "dressing",
  name: "Dressing",
  type: "single",
  priceType: "add",
  options: [
    {
      id: "ranch_dressing",
      name: "Ranch Dressing",
      price: 0,
      status: "available",
    },
    {
      id: "fat_free_ranch",
      name: "Fat Free Ranch",
      price: 0,
      status: "available",
    },
    {
      id: "balsamic_vinaigrette",
      name: "Balsamic Vinaigrette",
      price: 0,
      status: "available",
    },
    {
      id: "thousand_island_dressing",
      name: "Thousand Island Dressing",
      price: 0,
      status: "available",
    },
    {
      id: "caesar_dressing",
      name: "Caesar Dressing",
      price: 0,
      status: "available",
    },
    {
      id: "lite_italian_dressing",
      name: "Lite Italian Dressing",
      price: 0,
      status: "available",
    },
    {
      id: "honey_mustard",
      name: "Honey Mustard",
      price: 0,
      status: "available",
    },
    {
      id: "bleu_cheese_dressing",
      name: "Bleu Cheese Dressing",
      price: 0,
      status: "available",
    },
    {
      id: "house_vinaigrette",
      name: "House Vinaigrette",
      price: 0,
      status: "available",
    },
  ],
};

async function seed() {
  //await setDoc(doc(db, "menuCategories", "sandwiches"), sandwiches);
  await setDoc(doc(db, "modifierGroups", "bread"), breadModifiers);
  await setDoc(doc(db, "modifierGroups", "size"), sizeModifiers);
  await setDoc(doc(db, "modifierGroups", "protein"), proteinModifiers);
  await setDoc(doc(db, "modifierGroups", "cheese"), cheeseModifiers);
  await setDoc(doc(db, "modifierGroups", "extras"), extrasModifiers);
  ////

  await setDoc(doc(db, "modifierGroups", "greens"), greensModifiers);
  await setDoc(
    doc(db, "modifierGroups", "salad_toppings"),
    saladToppingsModifiers,
  );
  await setDoc(
    doc(db, "modifierGroups", "salad_protein"),
    saladProteinModifiers,
  );
  await setDoc(doc(db, "modifierGroups", "dressing"), dressingModifiers);
  console.log("Menu seeded");
}

seed();

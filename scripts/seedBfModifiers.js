import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();


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

const spreadsModifiers = {
  id: "spreads",
  name: "Spread",
  type: "single",
  priceType: "add",
  options: [
    {
      id: "no_spread",
      name: "Plain, No Spread",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "butter",
      name: "Butter",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "cream_cheese",
      name: "Cream Cheese",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
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
    {
      id: "jalapeno_cream_cheese",
      name: "Jalapeno Cream Cheese",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
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
    {
      id: "peanut_butter_w_grape",
      name: "Peanut Butter & Grape Jelly",
      price: 0,
      status: "available",
      availability: "breakfast_only",
    },
    {
      id: "peanut_butter_w_strawberry",
      name: "Peanut Butter & Strawberry Jelly",
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

const hashbrownModifiers = {
  id: "hashbrown",
  name: "Hash Brown",
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
      id: "cinnamon",
      name: "Cinnamon",
      price: 0,
      status: "available",
    },
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
    },
  ],
};

export async function seed(db) {
  await db.collection("modifierGroups")
    .doc("bagel")
    .set(bagelModifiers);

  await db.collection("modifierGroups")
    .doc("breakfast_protein")
    .set(breakfastProteinModifiers);

  await db.collection("modifierGroups")
    .doc("spreads")
    .set(spreadsModifiers);

  await db.collection("modifierGroups")
    .doc("hashbrown")
    .set(hashbrownModifiers);

  await db.collection("modifierGroups")
    .doc("oatmeal_toppings")
    .set(oatmealToppingsModifiers);

  console.log("Menu bf modifiers seeded");
}


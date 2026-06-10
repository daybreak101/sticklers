import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Category, ModifierGroup } from "@/types/menu";
import { Hours } from "@/context/HoursContext";

const HOURS_KEY = "hours";

export async function getHours(): Promise<Hours[]> {
  try {
    const CACHE_TTL = 1000 * 60 * 10; // 10 min //TODO: reset this

    // 1. Check cache
    const cached = await AsyncStorage.getItem(HOURS_KEY);

    if (cached) {
      const parsed = JSON.parse(cached);

      const isValid =
        parsed?.timestamp && parsed?.data && Array.isArray(parsed.data);

      if (isValid) {
        const isFresh = Date.now() - parsed.timestamp < CACHE_TTL;

        if (isFresh) {
          return parsed.data; 
        }
      }
    }

    // 2. Fetch from Firestore
    const snapshot = await getDoc(doc(db, "business", "businessInfo"));

    

    const data = snapshot.data()

    if(!data?.businessHours) return [];

    const hours = data.businessHours as Hours[];

    // 3. Save to storage
    await AsyncStorage.setItem(
      HOURS_KEY,
      JSON.stringify({ timestamp: Date.now(), hours }),
    );

    return hours;
  } catch (err) {
    console.error("Error fetching hours:", err);
    return [];
  }
}


const STORAGE_KEY = "menu_categories";

export async function getMenuCategories(): Promise<Category[]> {
  try {
   // await AsyncStorage.removeItem(STORAGE_KEY);
    const CACHE_TTL = 1000 * 60 * 1; // 10 min //TODO: reset this

    // 1. Check cache
    const cached = await AsyncStorage.getItem(STORAGE_KEY);

    if (cached) {
      const parsed = JSON.parse(cached);

      const isValid =
        parsed?.timestamp && parsed?.data && Array.isArray(parsed.data);

      if (isValid) {
        const isFresh = Date.now() - parsed.timestamp < CACHE_TTL;

        if (isFresh) {
          return parsed.data; 
        }
      }
    }

    // 2. Fetch from Firestore
    const snapshot = await getDocs(collection(db, "menuCategories"));

    const data = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Category,
    ).sort((a, b) => a.order - b.order);

    // 3. Save to storage
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ timestamp: Date.now(), data }),
    );

    return data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

const MODIFIER_KEY = "menu_modifiers";
export async function getModifierGroups(): Promise<ModifierGroup[]> {
  try {
   // await AsyncStorage.removeItem(STORAGE_KEY);
    const CACHE_TTL = 1000 * 60 * 1; // 10 min //TODO: reset this

    // 1. Check cache
    const cached = await AsyncStorage.getItem(MODIFIER_KEY);

    if (cached) {
      const parsed = JSON.parse(cached);

      const isValid =
        parsed?.timestamp && parsed?.data && Array.isArray(parsed.data);

      if (isValid) {
        const isFresh = Date.now() - parsed.timestamp < CACHE_TTL;

        if (isFresh) {
          return parsed.data; 
        }
      }
    }

    // 2. Fetch from Firestore
    const snapshot = await getDocs(collection(db, "modifierGroups"));

    const data = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ModifierGroup,
    )//.sort((a, b) => a.order - b.order);

    // 3. Save to storage
    await AsyncStorage.setItem(
      MODIFIER_KEY,
      JSON.stringify({ timestamp: Date.now(), data }),
    );

    return data;
  } catch (err) {
    console.error("Error fetching modifiers:", err);
    return [];
  }
}
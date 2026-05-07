import {
  CartItem,
  CustomerInfo,
  NonDefaultModifiers,
  Order,
  SelectedModifiers,
} from "@/types/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE_KEY = "user_info";
const PREV_ORDERS_STORAGE_KEY = "prev_orders";
const FAVORITES_STORAGE_KEY = "favorites";

export async function getUserInfo(): Promise<CustomerInfo | null> {
  try {
    const cached = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (cached) {
      return JSON.parse(cached);
    }

    return null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export async function setUserInfo(user: CustomerInfo) {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Error saving user:", err);
  }
}

export async function fetchPrevOrders(): Promise<Order[]> {
  try {
    const cached = await AsyncStorage.getItem(PREV_ORDERS_STORAGE_KEY);

    if (cached) {
      return JSON.parse(cached).data.sort(
        (a: Order, b: Order) => b.createdAt.seconds - a.createdAt.seconds,
      );
    }

    return [];
  } catch (err) {
    console.error("Error fetching prev orders:", err);
    return [];
  }
}

export async function saveToPrevOrders(orders: Order) {
  try {
    const prevOrders = await fetchPrevOrders();

    await AsyncStorage.setItem(
      PREV_ORDERS_STORAGE_KEY,
      JSON.stringify([...prevOrders, orders]),
    );
  } catch (err) {
    console.error("Error saving prev orders:", err);
  }
}

export type Favorite = Omit<CartItem, "cartItemId" | "quantity" | "finalPrice">;
export async function fetchFavorites(): Promise<Favorite[]> {
  try {
    const cached = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

    if (cached) {
      return JSON.parse(cached);
    }

    return [];
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
}

export async function saveToFavorites(itemToFavorite: CartItem) {
  try {
    const prevFavorites = await fetchFavorites();

    const newFavorite = { ...itemToFavorite };

    const favorites = [newFavorite, ...prevFavorites];

    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  } catch (err) {
    console.error("Error saving favorites:", err);
  }
}

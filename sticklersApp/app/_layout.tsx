import "react-native-get-random-values";
import { ThemedText } from "@/components/defaults/themed-text";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { HoursProvider } from "@/context/HoursContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <HoursProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </HoursProvider>
      </CartProvider>
    </AuthProvider>
  );
}

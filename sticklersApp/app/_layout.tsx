import 'react-native-get-random-values'
import { ThemedText } from "@/components/defaults/themed-text";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </CartProvider>
  );
}

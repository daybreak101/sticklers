import "react-native-get-random-values";
import { ThemedText } from "@/components/defaults/themed-text";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { HoursProvider } from "@/context/HoursContext";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { ThemedView } from "@/components/defaults/themed-view";

export default function RootLayout() {
  const { isConnected } = useNetworkStatus();

  if (!isConnected) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>No internet connection. Please try again later.</ThemedText>
      </ThemedView>
    );
  }

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

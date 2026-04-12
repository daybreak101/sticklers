import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function IndexLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Menu" }} />
        <Stack.Screen name="[id]" options={{ title: "Category" }} />
      </Stack>
    </SafeAreaProvider>
  );
}

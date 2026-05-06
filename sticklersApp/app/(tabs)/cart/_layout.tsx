import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexLayout() {
  function CustomHeader({ title }: { title?: string }) {
    const navigation = useNavigation();

    return (
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#000" }}>
        <ThemedView
          style={{
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            backgroundColor: "#333",
          }}
        >
          {navigation.canGoBack() && (
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={20} color={"white"} />
            </Pressable>
          )}
          <ThemedText style={{ fontSize: 20 }}>{title}</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: true,
          header: ({ options }) => <CustomHeader title={options.title} />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Cart" }} />
        <Stack.Screen
          name="checkout"
          options={{ title: "Checkout" }}
        />
        <Stack.Screen
          name="edit/[cartItemId]"
          options={{ title: "Edit Item" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

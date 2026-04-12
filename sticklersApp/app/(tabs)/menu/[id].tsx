import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/defaults/themed-text";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();

  return (
        <SafeAreaView style={globalStyles.safeArea}>
      <ThemedText>Category: {id}</ThemedText>
    </SafeAreaView>
  );
}

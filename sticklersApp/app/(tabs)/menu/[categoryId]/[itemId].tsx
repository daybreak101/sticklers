import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { Category, Item } from "@/types/menu";
import { useLocalSearchParams } from "expo-router";
import { getMenuCategories } from "@/lib/menuStorage";
import { images } from "@/constants/images";

export default function ItemPage() {
  const [item, setItem] = React.useState<Item | null>(null);
  const [category, setCategory] = React.useState<Category | null>(null);
  const { categoryId, itemId } = useLocalSearchParams();

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const categories = await getMenuCategories();
    const found = categories.find((c) => c.id === categoryId) || null;
    const item = found?.items.find((i) => i.itemId === itemId) || null;
    setItem(item || null);
  };

  if (!item) return null;

  const imageKey: string | undefined = item.image ?? category.image;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={globalStyles.page}>
        <ImageBackground
          source={images[imageKey ?? "logo"]}
          style={styles.image}
          resizeMode="cover"
        ></ImageBackground>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

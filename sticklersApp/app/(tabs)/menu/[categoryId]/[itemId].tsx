import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { Category, Item } from "@/types/menu";
import { useLocalSearchParams } from "expo-router";
import { getMenuCategories } from "@/lib/menuStorage";
import { images } from "@/constants/images";
import { ThemedText } from "@/components/defaults/themed-text";

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
    setCategory(found || null);
    const item = found?.items.find((i) => i.itemId === itemId) || null;
    setItem(item || null);
  };

  if (!item) return null;

  const imageKey: string | undefined | null = item.image ?? category?.image;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, { position: "relative" }]}>
        <ImageBackground
          source={images[imageKey ?? "logo"]}
          style={styles.image}
          resizeMode="cover"
        ></ImageBackground>
        <ThemedText style={[globalStyles.title, styles.title]}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
        <Text style={styles.price}>${item.basePrice.toFixed(2)}</Text>

        {/*  */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add to Order</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add to Order</Text>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    paddingTop: 20,
    textAlign: "center",
  },
  description: {
    padding: 20,
    textAlign: "center",
    fontWeight: 200,
    fontSize: 14,
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "rgb(232, 70, 70)",
  },
  button: {
    backgroundColor: "rgb(232, 70, 70)",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 300,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

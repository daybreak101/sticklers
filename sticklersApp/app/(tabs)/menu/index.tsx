import ParallaxScrollView from "@/components/defaults/parallax-scroll-view";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/global";
import { getMenuCategories } from "@/lib/menuStorage";
import { Category } from "@/types/menu";
import CategoryOption from "@/components/CategoryOption";

export default function HomeScreen() {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getMenuCategories();
    console.log(result);
    setData(result);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={globalStyles.page}>
        <ThemedText style={styles.title}>CATEGORIES</ThemedText>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CategoryOption category={item} />}
          ItemSeparatorComponent={() => <View style={{padding: 10}}></View>}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

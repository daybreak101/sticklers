import { FlatList, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/styles/global";
import { ThemedText } from "@/components/defaults/themed-text";
import { Category } from "@/types/menu";
import { useEffect, useState } from "react";
import { getMenuCategories } from "@/lib/menuStorage";
import { ThemedView } from "@/components/defaults/themed-view";
import ItemOption from "@/components/ItemOption";
export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategory = async () => {
    const categories = await getMenuCategories();
    const found = categories.find((c) => c.id === categoryId) || null;
    //nsole.log("found category:", found);
    setCategory(found || null);
  };

  if (!category) return null;

  return (
    <>
      <Stack.Screen options={{ title: category.name }} />
      <ThemedView style={globalStyles.page}>
        <ThemedText style={styles.description}>
          {category.description}
        </ThemedText>
        <FlatList
          data={category.items.sort((a, b) => a.order - b.order)}
          numColumns={2}
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => (
            <ItemOption item={item} category={category} />
          )}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }}></View>}
          ListFooterComponent={<View style={{ padding: 10 }}></View>}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 300,
    fontStyle: "italic",
  },
});

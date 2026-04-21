import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartScreen() {

  const { cart } = useCart();

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={globalStyles.page}>
        <ThemedText
          style={[
            globalStyles.title,
            { paddingTop: 10, paddingHorizontal: 20 },
          ]}
        >
          Cart
        </ThemedText>
        <ThemedText style={styles.description}>
          {cart.items.length} items in your cart
        </ThemedText>
        <FlatList 
          data={cart.items}
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => <ThemedText>{item.name}</ThemedText>}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }}></View>}
          ListFooterComponent={<View style={{ padding: 10 }}></View>}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 300,
  },
});

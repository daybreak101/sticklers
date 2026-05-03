import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartItemComponent from "@/components/CartItemComponent";

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
          keyExtractor={(item) => item.cartItemId}
          renderItem={({ item }) => <CartItemComponent cartItem={item} />}
          ItemSeparatorComponent={() => (
            <View style={{ paddingTop: 10 }}></View>
          )}
          ListFooterComponent={<View style={{ padding: 10 }}></View>}
        />
      </ThemedView>
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarBottom}>
          <ThemedText style={styles.total}>Total: <Text style={styles.price}>${cart.totalPrice.toFixed(2)}</Text></ThemedText>
          <Pressable style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
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
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 300,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "rgb(232, 70, 70)",
    padding: 10,
    borderRadius: 10,
  },
  bottomBar: {
    borderTopColor: "rgb(249, 249, 249)",
    borderTopWidth: 0.2,
  },
  bottomBarBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  total: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  }
});

import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartItemComponent from "@/components/cart/CartItemComponent";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <>
      <ThemedView style={globalStyles.page}>
        <ThemedText style={styles.description}>
          {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in your
          cart
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
      {cart.items.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarBottom}>
            <ThemedText style={styles.total}>
              Total:{" "}
              <Text style={styles.price}>${cart.totalPrice.toFixed(2)}</Text>
            </ThemedText>
            <Pressable
              style={styles.buttonContainer}
              onPress={() =>
                router.push({
                  pathname: "/cart/checkout",
                })
              }
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
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
    backgroundColor: globalStyles.themeBlack.color,
    borderTopColor: "rgb(249, 249, 249)",
    borderTopWidth: 0.2,
    paddingBottom: 10,
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
  },
});

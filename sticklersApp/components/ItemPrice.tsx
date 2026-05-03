import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./defaults/themed-text";

type ItemPriceProps = {
  totalPrice: number;
};

export default function ItemPrice({
  totalPrice,
}: ItemPriceProps) {

  return (
    <View style={styles.bottomBarTop}>
      <ThemedText style={styles.totalText}>Total</ThemedText>
      <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBarTop: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "rgb(232, 70, 70)",
  },
  totalText: { fontSize: 20, textAlign: "center", paddingLeft: 10 },
});

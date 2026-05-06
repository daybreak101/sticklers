import { StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { useCart } from "@/context/CartContext";
import { Stack } from "expo-router";

export default function CheckoutScreen() {
  const { user } = useAuth();
  const { cart } = useCart();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <ThemedView style={globalStyles.page}>
      <Stack.Screen options={{ title: "Checkout" }} />
      <ThemedText style={[globalStyles.title, { padding: 10 }]}>
        CHECKOUT
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});

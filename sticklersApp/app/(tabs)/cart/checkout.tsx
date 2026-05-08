import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { useCart } from "@/context/CartContext";
import { Stack, useRouter } from "expo-router";
import SignedOutCheckout from "@/components/cart/SignedOutCheckout";

export default function CheckoutScreen() {
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <ThemedView style={globalStyles.page}>
      <Stack.Screen options={{ title: "Checkout" }} />
      <ThemedText style={[globalStyles.title, { padding: 10 }]}>
        CHECKOUT
      </ThemedText>
      {user ? (
        <View>
          <ThemedText>Total Items: {cartQuantity}</ThemedText>
          {/* TODO: find tax rate, find processing fee*/}
          <ThemedText>Total Price: {totalPrice}</ThemedText>
          <ThemedText>Please note: if paying with a card, you will be charged a processing fee.</ThemedText>
        
          
        </View>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({});

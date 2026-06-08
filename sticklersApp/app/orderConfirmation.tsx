import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { ThemedText } from "@/components/defaults/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableButton from "@/components/defaults/ReusableButton";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmationScreen() {
  // TODO: send order information from checkout to this screen
  // TODO: send order confirmation email???
  // TODO: save order to recent orders

  const router = useRouter();
  const { cart, clearCart, setPreviousOrder } = useCart();

  const returnToMenu = () => {
    clearCart();
    setPreviousOrder(null);
    router.replace("/menu");
  }


  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, { paddingBottom: 0 }]}>
        <ThemedText style={globalStyles.title}>Order Confirmed</ThemedText>
        <ThemedText>Thank you for ordering with Sticklers!</ThemedText>
        <ThemedText>
          Your order will be ready for pickup in 15 minutes.
        </ThemedText>
        <ReusableButton submit={returnToMenu} buttonText="Return to Menu" />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

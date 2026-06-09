import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { ThemedText } from "@/components/defaults/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableButton from "@/components/defaults/ReusableButton";
import { useCart } from "@/context/CartContext";
import { useHours } from "@/context/HoursContext";

export default function OrderConfirmationScreen() {
  // TODO: send order information from checkout to this screen
  // TODO: send order confirmation email???
  // TODO: save order to recent orders

  const router = useRouter();
  const { cart, clearCart, setPreviousOrder, previousOrder } = useCart();
  const { reset } = useHours();

  const returnToMenu = () => {
    clearCart();
    setPreviousOrder(null);
    reset();
    router.replace("/menu");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, { paddingBottom: 0 }]}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ThemedText style={[globalStyles.title, styles.title]}>
              Order Confirmed
            </ThemedText>
            <ThemedText>Thank you for ordering with Sticklers!</ThemedText>
            <ThemedText>
              Your order will be ready for pickup in 15 minutes.
            </ThemedText>
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText>ORDER DETAILS</ThemedText>
            <ThemedText>Order ID: {previousOrder?.id}</ThemedText>
            <ThemedText>
              Customer Name: {previousOrder?.customerInfo.name}
            </ThemedText>
            <ThemedText>
              Customer Email: {previousOrder?.customerInfo.email}
            </ThemedText>
            <ThemedText>
              Customer Phone: {previousOrder?.customerInfo.phone}
            </ThemedText>
            <ThemedText>
              Special Requests: {previousOrder?.specialRequests}
            </ThemedText>
            <ThemedText>
              Total Price: ${previousOrder?.cartPrice.toFixed(2)}
            </ThemedText>
            <ThemedText>Tax: ${previousOrder?.taxPrice.toFixed(2)}</ThemedText>
            <ThemedText>
              Total With Tax: ${previousOrder?.totalWithTax.toFixed(2)}
            </ThemedText>
            <ThemedText>Cart Items:</ThemedText>
            {previousOrder?.cart.items.map((item, index) => (
              <ThemedText key={index}>
                {item.name} - ${item.finalPrice.toFixed(2)}
              </ThemedText>
            ))}
          </View>
          <ReusableButton
            submit={returnToMenu}
            buttonText="Return to Menu"
            buttonStyles={{ marginBottom: 50 }}
          />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
  },
});

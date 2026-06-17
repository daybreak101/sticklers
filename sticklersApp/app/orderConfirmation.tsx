import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {  useRouter } from "expo-router";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { ThemedText } from "@/components/defaults/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableButton from "@/components/defaults/ReusableButton";
import { useCart } from "@/context/CartContext";
import { useHours } from "@/context/HoursContext";
import { formatBusinessTime, formatDay } from "@/lib/formatTime";

export default function OrderConfirmationScreen() {
  // TODO: send order information from checkout to this screen
  // TODO: send order confirmation email???
  // TODO: save order to recent orders

  const router = useRouter();
  const { clearCart, setPreviousOrder, previousOrder } = useCart();
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <ThemedText style={[globalStyles.title, styles.title]}>
              Order Confirmed
            </ThemedText>
            <ThemedText>Thank you for ordering with Sticklers!</ThemedText>
            <ThemedText>Our team is currently preparing your order.</ThemedText>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 100 }}>
            <ThemedText style={{ paddingBottom: 10, paddingTop: 30, textDecorationLine: "underline" }}>ORDER DETAILS</ThemedText>
            <ThemedText>Order ID: {previousOrder?.id}</ThemedText>
            {previousOrder?.timeSlot && (
              <ThemedText>
                Pickup Date: {formatDay(previousOrder?.timeSlot?.getDay())},{" "}
                {previousOrder?.timeSlot?.getMonth() + 1}/
                {previousOrder?.timeSlot?.getDate()}
              </ThemedText>
            )}
            {previousOrder?.timeSlot && (
              <ThemedText>
                Pickup Time:{" "}
                {formatBusinessTime(
                  previousOrder?.timeSlot?.getHours() * 100 +
                    previousOrder?.timeSlot?.getMinutes(),
                )}
              </ThemedText>
            )}
            <ThemedText style={{ paddingBottom: 10, paddingTop: 30, textDecorationLine: "underline" }}>
              CUSTOMER INFO
            </ThemedText>

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

            <ThemedText style={{ paddingBottom: 10, paddingTop: 30, textDecorationLine: "underline" }}>CART ITEMS</ThemedText>
            {previousOrder?.cart.items.map((item, index) => (
              <ThemedText key={index}>
                {item.name} - ${item.finalPrice.toFixed(2)}
              </ThemedText>
            ))}

            <ThemedText style={{ paddingBottom: 10, paddingTop: 30, textDecorationLine: "underline" }}>TOTALS</ThemedText>
            <ThemedText>
              Total Price: ${previousOrder?.cartPrice.toFixed(2)}
            </ThemedText>
            <ThemedText>Tax: ${previousOrder?.taxPrice.toFixed(2)}</ThemedText>
            <ThemedText>
              Total With Tax: ${previousOrder?.totalWithTax.toFixed(2)}
            </ThemedText>
          </View>
        </ScrollView>
        <ReusableButton
          submit={returnToMenu}
          buttonText="Return to Menu"
          buttonStyles={{
            marginBottom: 10,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
  },
});

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { use, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { useCart } from "@/context/CartContext";
import { Stack, useRouter } from "expo-router";
import SignedOutCheckout from "@/components/cart/SignedOutCheckout";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import InputField from "@/components/defaults/InputField";
import ReusableButton from "@/components/defaults/ReusableButton";
import DateTimePicker from "@react-native-community/datetimepicker"

export default function CheckoutScreen() {
  const { user, profile } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [cartQuantity, setCartQuantity] = useState(cart.totalItems);
  const [totalPrice, setTotalPrice] = useState(
    `$${cart.totalPrice.toFixed(2)}`,
  );

  const schema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email").transform((v) => v.trim()),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{7,20}$/, "Invalid phone number"),
    specialRequests: z.string().optional(),
  });
  type FormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile ? `${profile?.firstName} ${profile?.lastName}` : "",
      email: user ? (user?.email as string) : "",
      phone: profile?.phone ?? "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const newOrder = {
      id: Date.now().toString(),
      customerInfo: {
        id: user?.uid,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
      },
      cart: cart,
      timeReady: null,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      specialRequests: data.specialRequests,
    };
    await setDoc(doc(db, "orders", newOrder.id), newOrder);
    clearCart();
    router.push("/cart/orderConfirmation");
  };

  return (
    <ThemedView style={[globalStyles.page, { paddingBottom: 0 }]}>
      <Stack.Screen options={{ title: "Checkout" }} />
      {user && user.emailVerified ? (
        <View style={{flex: 1}}>
          <View>
            {/* ASAP or scheduled? */}
            {/* if ASAP, assume order is ready in 1o minutes */}
            {/* if scheduled, display date/time picker */}
          </View>

          <InputField
            control={control}
            controlValue="name"
            errors={errors}
            label="Name"
            icon="person"
          />
          <InputField
            control={control}
            controlValue="phone"
            errors={errors}
            label="Phone Number"
            icon="phone"
            keyboardType="phone-pad"
          />
          <InputField
            control={control}
            controlValue="email"
            errors={errors}
            label="Email"
            icon="email"
          />
          <InputField
            control={control}
            controlValue="specialRequests"
            errors={errors}
            label="Special Requests"
            icon="sticky-note-2"
          />

          <ThemedView>
            <ThemedText>Total Items: {cartQuantity}</ThemedText>
            <ThemedText>
              Please note: if paying with a card, you will be charged a
              processing fee.
            </ThemedText>
          </ThemedView>

          <ReusableButton
            submit={handleSubmit(onSubmit)}
            buttonText={`Place Order   •   ${totalPrice}`}
            buttonStyles={{
              width: "100%",
              height: 75,
              textAlign: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 0,
            }}
            textStyles={{ fontSize: 20 }}
          />
        </View>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

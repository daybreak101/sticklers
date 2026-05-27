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
import { id } from "zod/v4/locales";
import { db } from "@/lib/firebaseConfig";
import InputField from "@/components/defaults/InputField";

export default function CheckoutScreen() {
  const { user, profile } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const [cartQuantity, setCartQuantity] = useState(cart.items.length);
  const [totalPrice, setTotalPrice] = useState(
    `$${cart.totalPrice.toFixed(2)}`,
  );

  const schema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email"),
    phone: z
      .string()
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
        "Invalid Number!",
      ),
    specialRequests: z.string().min(2, "Special Requests is too short"),
    //phone: z.string().min(10, "Invalid phone number"),
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
      phone: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const newOrder = {
      id: Date.now().toString(),
      customerInfo: {
        id: user?.uid,
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      cart: cart,
      timeReady: null,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      specialRequests: data.specialRequests,
    };
    await setDoc(doc(db, "orders", newOrder.id), newOrder);
    router.push("../(tabs)/cart/orderConfirmation");
  };

  return (
    <ThemedView style={globalStyles.page}>
      <Stack.Screen options={{ title: "Checkout" }} />
      {user && user.emailVerified ? (
        <View>
          <ThemedText>Total Items: {cartQuantity}</ThemedText>
          {/* TODO: find tax rate, find processing fee*/}
          <ThemedText>Total Price: {totalPrice}</ThemedText>
          <ThemedText>
            Please note: if paying with a card, you will be charged a processing
            fee.
          </ThemedText>

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
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </Pressable>
        </View>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

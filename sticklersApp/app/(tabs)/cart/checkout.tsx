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

export default function CheckoutScreen() {
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
      name: "",
      email: "",
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
    }
    await setDoc(doc(db, "orders", newOrder.id), newOrder);
    router.push("../(tabs)/cart/orderConfirmation");
  };

  return (
    <ThemedView style={globalStyles.page}>
      <Stack.Screen options={{ title: "Checkout" }} />
      {user ? (
        <View>
          <ThemedText>Total Items: {cartQuantity}</ThemedText>
          {/* TODO: find tax rate, find processing fee*/}
          <ThemedText>Total Price: {totalPrice}</ThemedText>
          <ThemedText>
            Please note: if paying with a card, you will be charged a processing
            fee.
          </ThemedText>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Text>{errors.name.message}</Text>}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.phone && <Text>{errors.phone.message}</Text>}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.specialRequests && <Text>{errors.specialRequests.message}</Text>}
                    <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Special Requests"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.specialRequests && <Text>{errors.specialRequests.message}</Text>}
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({});

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
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

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

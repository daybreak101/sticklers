import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import ScheduleOrder from "@/components/cart/ScheduleOrder";
import { Order } from "@/types/cart";
import { useHours } from "@/context/HoursContext";

export default function CheckoutScreen() {
  const { user, profile } = useAuth();
  const { cart, setPreviousOrder } = useCart();
  const router = useRouter();
  const { scheduledTime, setScheduledTime, scheduledDate, setScheduledDate } =
    useHours();

  const [cartQuantity, setCartQuantity] = useState(cart.totalItems);
  const [totalPrice, setTotalPrice] = useState(
    `$${cart.totalPrice.toFixed(2)}`,
  );

  useEffect(() => {}, []);

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
    //combine pickup date and time
    let timeSlot = scheduledDate ?? new Date();
    if (scheduledTime) {
      timeSlot?.setHours(scheduledTime.getHours());
      timeSlot?.setMinutes(scheduledTime.getMinutes());
    } else {
      const now = new Date();
      timeSlot?.setHours(now.getHours());
      timeSlot?.setMinutes(now.getMinutes() + 15);
    }

    const newOrder = {
      id: Date.now().toString(),
      customerInfo: {
        id: user?.uid,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
      },
      cart: cart,
      timeSlot: timeSlot,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      specialRequests: data.specialRequests,
    } as Order;
    await setDoc(doc(db, "orders", newOrder.id), newOrder);
    setPreviousOrder(newOrder);
    //clearCart();
    router.replace("/orderConfirmation");
  };

  return (
    <ThemedView style={[globalStyles.page, { paddingBottom: 0 }]}>
      <Stack.Screen options={{ title: "Checkout" }} />
      {user && user.emailVerified ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            <ThemedText style={globalStyles.title}>Pickup Details</ThemedText>
            {/* <ScheduleOrder /> */}

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

            <ThemedView style={{ paddingBottom: 100 }}>
              <ThemedText>Total Items: {cartQuantity}</ThemedText>
              <ThemedText>
                Please note: if paying with a card, you will be charged a
                processing fee.
              </ThemedText>
            </ThemedView>
          </ScrollView>
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
            isDisabled={true}
          />
        </>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

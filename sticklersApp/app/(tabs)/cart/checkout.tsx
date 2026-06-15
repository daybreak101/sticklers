import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { useCart } from "@/context/CartContext";
import { Stack, useRouter } from "expo-router";
import SignedOutCheckout from "@/components/cart/SignedOutCheckout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import InputField from "@/components/defaults/InputField";
import ReusableButton from "@/components/defaults/ReusableButton";
import { Order } from "@/types/cart";
import { useHours } from "@/context/HoursContext";
import useCurrentMinute from "@/hooks/useCurrentMinute";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CheckoutScreen() {
  const { user, profile } = useAuth();
  const { cart, setPreviousOrder, checkAvailability } = useCart();
  const router = useRouter();
  const { scheduledTime, scheduledDate } =
    useHours();

  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    const fetchTax = async () => {
      const snapshot = await getDoc(doc(db, "business", "businessInfo"));
      const data = snapshot.data();
      const tax = data?.tax ?? 0;
      const totalTax = Math.ceil(cart.totalPrice * tax * 100) / 100;
      const totalWithTaxes =
        Math.ceil((cart.totalPrice + totalTax) * 100) / 100;
      setTax(tax);
      setTotalTax(totalTax);
      setTotalWithTax(totalWithTaxes);
    };
    fetchTax();
  }, [cart.totalPrice]);

  const currentMinute = useCurrentMinute();
  useEffect(() => {
    const now = new Date();
    if (scheduledTime) {
      now.setHours(scheduledTime.getHours());
      now.setMinutes(scheduledTime.getMinutes());
    }
    const time = now.getHours() * 100 + now.getMinutes();
    checkAvailability(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMinute, scheduledTime]);

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
      cartPrice: cart.totalPrice,
      tax: tax,
      taxPrice: totalTax,
      totalWithTax: totalWithTax,
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
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={100}
          >
            <ThemedText style={[globalStyles.title, { padding: 10 }]}>
              Pickup Details
            </ThemedText>
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
              <ThemedText
                style={{
                  fontStyle: "italic",
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                Please note: if paying with a card, you will be charged a
                processing fee.
              </ThemedText>
              <View style={{ paddingLeft: 100 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <ThemedText>Total Items: </ThemedText>
                  <ThemedText style={{ paddingRight: 10 }}>
                    {cart.totalItems}
                  </ThemedText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <ThemedText>Subtotal: </ThemedText>
                  <ThemedText style={{ paddingRight: 10 }}>
                    ${cart.totalPrice.toFixed(2)}
                  </ThemedText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <ThemedText>Tax ({tax * 100}%):</ThemedText>
                  <ThemedText style={{ paddingRight: 10 }}>
                    {" "}
                    ${totalTax.toFixed(2)}
                  </ThemedText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                  }}
                >
                  <ThemedText>Total: </ThemedText>
                  <ThemedText style={{ paddingRight: 10 }}>
                    ${totalWithTax.toFixed(2)}
                  </ThemedText>
                </View>
              </View>
            </ThemedView>
          </KeyboardAwareScrollView>
          <ReusableButton
            submit={handleSubmit(onSubmit)}
            buttonText={`Place Order   •   $${totalWithTax}`}
            buttonStyles={{
              width: "100%",
              height: 75,
              textAlign: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 0,
            }}
            textStyles={{ fontSize: 20 }}
            isDisabled={cart.items.some((item) => !item.isAvailable)}
          />
        </>
      ) : (
        <SignedOutCheckout />
      )}
    </ThemedView>
  );
}

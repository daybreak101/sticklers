import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../defaults/themed-text";
import { useRouter } from "expo-router";

export default function SignedOutCheckout() {
    const router = useRouter();
  return (
    <View>
      <ThemedText>Please sign to checkout</ThemedText>
      <Pressable
        onPress={() => {
          router.push("/profile");
        }}
      >
        <ThemedText>Go to Profile</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});

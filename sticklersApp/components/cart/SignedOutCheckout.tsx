import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../defaults/themed-text";
import { useRouter } from "expo-router";

export default function SignedOutCheckout() {
  const router = useRouter();
  return (
    <View style={styles.notice}>
      <ThemedText style={styles.note}>Please sign to checkout</ThemedText>
      <Pressable
        onPress={() => {
          router.push("/profile");
        }}
        style={styles.button}>
        <ThemedText>Go to Profile</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flex: 1,
    justifyContent: "center",
    gap: 10
  },
  note: {
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgb(232, 70, 70)",
    padding: 10,
    borderRadius: 10,
  },
});

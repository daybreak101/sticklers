import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "../defaults/themed-text";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function SignedOutCheckout() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <View style={styles.notice}>
      <ThemedText style={styles.note}>
        {user && !user?.emailVerified
          ? `Please verify your email before continuing to checkout`
          : `Please sign in before continuing to checkout.`}
      </ThemedText>
      <Pressable
        onPress={() => {
          router.push("/profile");
        }}
        style={styles.button}
      >
        <ThemedText>Go to Profile</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
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

import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/defaults/themed-text";

export default function VerifyEmail() {

  const [error, setError] = useState(false);

  const checkVerification = async () => {
    await auth.currentUser?.reload();

    if (auth.currentUser?.emailVerified) {
      console.log("Verified");
    } else {
      console.log("Not verified yet");
      setError(true);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, styles.screen]}>
        <ThemedText style={styles.text}>Please verify your email before continuing.</ThemedText>
        <ThemedText style={styles.text}>{error && "Failed to verify email"}</ThemedText>
        <Button title="I've Verified" onPress={checkVerification} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  }
});

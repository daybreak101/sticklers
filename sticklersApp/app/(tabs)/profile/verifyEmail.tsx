import { Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/defaults/themed-text";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(false);

  if(!user && !auth.currentUser) return null;


  const checkVerification = async () => {
    await auth.currentUser?.reload();

    if (auth.currentUser?.emailVerified) {
      console.log("Verified");
      router.replace("/profile");
    } else {
      console.log("Not verified yet");
      setError(true);
    }
  };

  const resendVerification = async () => {
    if (!auth.currentUser) return;
    await sendEmailVerification(auth.currentUser);
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/profile")
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, styles.screen]}>
        <ThemedText style={styles.text}>Please verify your email before continuing.</ThemedText>
        <ThemedText style={styles.text}>{error && "Failed to verify email"}</ThemedText>
        <Button title="I've Verified" onPress={checkVerification} />
        <Button title="Resend Verification" onPress={resendVerification} />
        <Button title="Logout" onPress={logout} />
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

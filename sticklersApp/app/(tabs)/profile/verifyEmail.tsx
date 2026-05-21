import { Button, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/defaults/themed-text";
import { sendEmailVerification, signOut, verifyBeforeUpdateEmail } from "firebase/auth";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

export default function VerifyEmail() {
  const { user, profile, refreshUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  if (!user && !auth.currentUser) return null;

  const checkVerification = async () => {
    await refreshUser();
    const refreshedUser = auth.currentUser;
    if (!refreshedUser) return;
    if (auth.currentUser?.emailVerified) {
      console.log("Verified");
      router.replace("/profile");
    } else {
      console.log("Not verified yet");
      setError("Email not yet verified");
    }
  };

  const resendVerification = async () => {
    if (!auth.currentUser) return;

    // NORMAL SIGNUP FLOW
    await sendEmailVerification(auth.currentUser);
    setError("Email sent");
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/profile");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={[globalStyles.page, styles.screen]}>
        <ThemedText style={styles.text}>
          Please verify your email before continuing.
        </ThemedText>
        {/* <ThemedText style={styles.text}>
          {error && "Failed to verify email"}
        </ThemedText> */}
        {/* <Button title="I've Verified" onPress={checkVerification} />
        <Button title="Resend Verification" onPress={resendVerification} />
        <Button title="Logout" onPress={logout} /> */}
        <ThemedView style={styles.buttonSection}>
          <ThemedText style={styles.error}>{error}</ThemedText>

          <Pressable onPress={checkVerification} style={styles.button}>
            <ThemedText style={styles.buttonText}>{`I've Verified`}</ThemedText>
          </Pressable>

        
            <Pressable onPress={resendVerification} style={styles.button}>
              <ThemedText style={styles.buttonText}>
                Resend Verification
              </ThemedText>
            </Pressable>

          <Pressable onPress={logout} style={styles.button}>
            <ThemedText style={styles.buttonText}>Log Out</ThemedText>
          </Pressable>
        </ThemedView>
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
    fontSize: 20,
    textAlign: "center",
  },
  buttonSection: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
});

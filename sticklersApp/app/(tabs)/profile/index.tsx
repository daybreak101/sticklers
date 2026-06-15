import { ThemedView } from "@/components/defaults/themed-view";
import DisplayUser from "@/components/profile/DisplayUser";
import SignInOrUp from "@/components/profile/SignInOrUp";
import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/global";
import { Redirect } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const { user } = useAuth();

  if (user && !user.emailVerified) {
    return <Redirect href="/profile/verifyEmail" />;
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
        <ThemedView style={globalStyles.page}>
          {user ? <DisplayUser /> : <SignInOrUp />}
        </ThemedView>
    </SafeAreaView>
  );
}

import { ThemedView } from "@/components/defaults/themed-view";
import DisplayUser from "@/components/profile/DisplayUser";
import SignIn from "@/components/profile/SignIn";
import SignInOrUp from "@/components/profile/SignInOrUp";
import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/global";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView style={globalStyles.page}>
        {user ? <DisplayUser /> : <SignInOrUp />}
      </ThemedView>
    </SafeAreaView>
  );
}

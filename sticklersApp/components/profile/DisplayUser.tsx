import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { Redirect } from "expo-router";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";

export default function DisplayUser() {
  const { user, profile } = useAuth();

  const logout = async () => {
    await signOut(auth);
  };
  if (!user) return null;
  if (!user.emailVerified) {
    console.log(user)
    console.log(profile)
    return <Redirect href="/profile/verifyEmail" />;
  }

  return (
    <ThemedView>
      <ThemedText>DisplayUser</ThemedText>
      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>{profile?.firstName}</ThemedText>
      <ThemedText>{profile?.lastName}</ThemedText>
      <ThemedText>
        {profile?.birthday &&
          profile?.birthday?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
      </ThemedText>
      <ThemedText>{user?.emailVerified}</ThemedText>
      <ThemedText onPress={logout}>Logout</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});

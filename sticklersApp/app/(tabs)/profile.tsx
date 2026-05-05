import { ThemedView } from "@/components/defaults/themed-view";
import DisplayUser from "@/components/profile/DisplayUser";
import SignIn from "@/components/profile/SignIn";
import { useAuth } from "@/context/AuthContext";
import React from "react";
export default function ProfileScreen() {

  const { user } = useAuth();


  

  return (
    <ThemedView>
      {user ? <DisplayUser /> : <SignIn />}
    </ThemedView>
  );
}
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebaseConfig";
import { deleteUser, signOut } from "firebase/auth";
import { Redirect, useRouter } from "expo-router";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";
import { deleteDoc, doc } from "firebase/firestore";
import CredentialModal from "./CredentialModal";
import AreYouSure from "../cart/AreYouSure";

export default function DisplayUser() {
  const borderColor = useThemeColor({ light: "#aaa", dark: "#fff" }, "text");
  const iconColor = useThemeColor({ light: "#aaa", dark: "#fff" }, "text");

  const { user, profile, refreshUser } = useAuth();
  const router = useRouter();

  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (!user) return;

    const refresh = async () => {
      await refreshUser();
    };

    refresh();
  }, []);

  const editProfile = () => {
    router.push("/profile/editProfile");
  };

  const logout = async () => {
    await signOut(auth);
  };
  if (!user) return null;
  if (!user.emailVerified) {
    console.log(user);
    console.log(profile);
    return <Redirect href="/profile/verifyEmail" />;
  }

  return (
    // full screen
    <ThemedView style={styles.screen}>
      <AreYouSure
        show={showLogout}
        setShow={setShowLogout}
        title="Logout"
        onAccept={logout}
        acceptText="Yes"
        rejectText="No"
        message="Are you sure you want to logout?"
      />
      <CredentialModal show={showDelete} setShow={setShowDelete} />
      {/* header */}
      <ThemedView
        style={[
          styles.header,
          {
            borderColor: borderColor,
          },
        ]}
      >
        {/* header row */}
        <ThemedView style={styles.headerRow}>
          <MaterialIcons
            style={styles.headerIcon}
            name="account-circle"
            size={50}
            color={iconColor}
          />
          <ThemedText style={styles.name}>
            {`${profile?.firstName} ${profile?.lastName}`}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.headerRow}>
          <MaterialIcons name="email" size={30} color={iconColor} />
          <ThemedText style={styles.email}>{user?.email}</ThemedText>
        </ThemedView>

        {profile?.birthday && (
          <ThemedView style={styles.headerRow}>
            <MaterialIcons name="cake" size={30} color={iconColor} />
            <ThemedText style={styles.birthday}>
              {profile.birthday.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      
      <Pressable onPress={editProfile} style={styles.button}>
        <ThemedText>Edit Profile</ThemedText>
      </Pressable>
      <Pressable onPress={() => setShowLogout(true)} style={styles.button}>
        <ThemedText>Logout</ThemedText>
      </Pressable>
      <Pressable onPress={() => setShowDelete(true)} style={styles.button}>
        <ThemedText>Delete Account</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 10,
    gap: 5,
  },
  headerIcon: {
    fontSize: 30,
  },

  headerRow: {
    paddingLeft: 8,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
    alignSelf: "center",
  },
  birthday: {
    fontSize: 16,
    color: "#bbb",
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

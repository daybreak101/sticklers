import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../defaults/themed-view";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ThemedText } from "../defaults/themed-text";
import { globalStyles } from "@/styles/global";

export default function SignInOrUp() {
  const [toggle, setToggle] = useState(false);

  return (
    <ThemedView style={styles.screen}>
      {toggle ? <SignUp /> : <SignIn />}
      <View style={styles.register}>
        <ThemedText style={styles.text}>
          {toggle ? "Already have an account?" : "Don't have an account?"} 
        </ThemedText>
        <ThemedText onPress={() => setToggle(!toggle)} style={[styles.text, styles.link]}>
          {toggle ? "Sign In" : "Create an Account"}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  register: {
    backgroundColor: globalStyles.themeRed.color,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: globalStyles.themeYellow.color,
    textDecorationLine: "underline",
  }
});

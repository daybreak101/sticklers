import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./themed-text";
import { globalStyles } from "@/styles/global";

type ReusableButtonProps = {
  submit: () => void;
  buttonText: string;
  buttonStyles?: any;
  textStyles?: any;
};

export default function ReusableButton({
  submit,
  buttonText,
  buttonStyles,
  textStyles,
}: ReusableButtonProps) {
  return (
    <Pressable onPress={submit} style={[styles.button, buttonStyles]}>
      <ThemedText style={[styles.buttonText, textStyles]}>{buttonText}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});

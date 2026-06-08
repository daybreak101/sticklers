import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./themed-text";
import { globalStyles } from "@/styles/global";

type ReusableButtonProps = {
  submit: () => void;
  buttonText: string;
  buttonStyles?: any;
  textStyles?: any;
  isDisabled?: boolean;
};

export default function ReusableButton({
  submit,
  buttonText,
  buttonStyles,
  textStyles,
  isDisabled,
}: ReusableButtonProps) {
  return (
    <Pressable
      onPress={submit}
      style={[
        styles.button,
        buttonStyles,
        {
          backgroundColor: isDisabled
            ? "#363636"
            : globalStyles.themeRedBright.color,
        },
      ]}
      disabled={isDisabled}
    >
      <ThemedText style={[styles.buttonText, textStyles]}>
        {buttonText}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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

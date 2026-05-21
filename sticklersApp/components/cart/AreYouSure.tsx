import { Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";

type AreYouSureProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
  acceptText: string;
  rejectText: string;
  message: string;
};

export default function AreYouSure({
  show,
  setShow,
  onAccept,
  acceptText,
  rejectText,
  message,
}: AreYouSureProps) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <ThemedView style={styles.modalContainer}>
        <ThemedView style={[styles.modal, { backgroundColor: useThemeColor({ light: "#fff", dark: "#343434" }, "background") }]}>
          <ThemedText style={styles.message}>
            {message}
          </ThemedText>
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
              gap: 20,
            }}
          >
            <Pressable onPress={() => setShow(false)} style={styles.button}>
              <ThemedText>{rejectText}</ThemedText>
            </Pressable>
            <Pressable onPress={onAccept} style={styles.button}>
              <ThemedText>{acceptText}</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

import { Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";

type AreYouSureProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onAccept: () => void;
  acceptText: string;
  rejectText: string;
  message: string;
};

export default function AreYouSure({
  show,
  setShow,
  title,
  onAccept,
  acceptText,
  rejectText,
  message,
}: AreYouSureProps) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <ThemedView style={styles.modalContainer}>
        <ThemedView
          style={[
            styles.modal,
            {
              backgroundColor: useThemeColor(
                { light: "#fff", dark: "#343434" },
                "background",
              ),
            },
          ]}
        >
          <ThemedText style={[globalStyles.title, styles.header]}>
            {title}
          </ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>
          <View style={styles.buttonSection}>
            <Pressable onPress={() => setShow(false)} style={styles.button}>
              <ThemedText style={styles.buttonText}>{rejectText}</ThemedText>
            </Pressable>
            <Pressable onPress={onAccept} style={styles.button}>
              <ThemedText style={styles.buttonText}>{acceptText}</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: globalStyles.themeRed.color,
    borderBottomWidth: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

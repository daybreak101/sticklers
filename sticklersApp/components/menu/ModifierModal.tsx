import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";
import ScheduleOrder from "../cart/ScheduleOrder";
import { useHours } from "@/context/HoursContext";
import { formatBusinessTime, formatDay } from "@/lib/formatTime";
import { ModifierOption } from "@/types/menu";

type ScheduleModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  modifiers: ModifierOption[];
};

export default function ModifierModal({ show, setShow, modifiers }: ScheduleModalProps) {


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={() => {}}
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
            Schedule Pickup
          </ThemedText>
          <ScheduleOrder />
          <ThemedText
            style={[
              styles.message,
              { textTransform: "uppercase", paddingTop: 10 },
            ]}
          >
            Store Hours
          </ThemedText>
          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 10,
            }}
          >
            {modifiers.map((mod, index) => (
              <View
                key={index}
                style={[
                  {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingVertical: 10,
                  },
                ]}
              >
    
              </View>
            ))}
          </View>
          <View style={styles.buttonSection}>
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
    justifyContent: "center",
    paddingTop: 20,
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

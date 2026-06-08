import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";
import ScheduleOrder from "../cart/ScheduleOrder";
import { useHours } from "@/context/HoursContext";
import { formatBusinessTime, formatDay } from "@/lib/formatTime";

type ScheduleModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ScheduleModal({ show, setShow }: ScheduleModalProps) {
  const { scheduledDate, setScheduledDate, scheduledTime, setScheduledTime, hours } =
    useHours();

  const onAccept = () => {
    if (!scheduledDate) return;

    const day = scheduledDate.getDay();
    const now = new Date();
    if (hours[day].open === null) {
      Alert.alert("Unavailable", "Store is not open on this day.");
      return;
    } else if (
      now.getDate() === scheduledDate.getDate() &&
      now.getTime() > (hours[now.getDay()].close ?? 0) * 1000
    ) {
      Alert.alert("Unavailable", "Pickup time is too late.");
      return;
    }

    setShow(false);
  };

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
            {hours.map((hour, index) => (
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
                <ThemedText>{formatDay(index)} </ThemedText>
                <ThemedText>
                  {hour.open
                    ? `${formatBusinessTime(hour.open)} - ${formatBusinessTime(hour.close)}`
                    : "Closed"}
                </ThemedText>
              </View>
            ))}
          </View>
          <View style={styles.buttonSection}>
            <Pressable onPress={onAccept} style={styles.button}>
              <ThemedText style={styles.buttonText}>Confirm</ThemedText>
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

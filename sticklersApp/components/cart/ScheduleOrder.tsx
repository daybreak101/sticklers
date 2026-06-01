import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import z, { email } from "zod";
import { globalStyles } from "@/styles/global";
import { ThemedView } from "../defaults/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../defaults/themed-text";
import InputField from "../defaults/InputField";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { useRouter } from "expo-router";
import ReusableButton from "../defaults/ReusableButton";
import DateTimePicker from "@react-native-community/datetimepicker";

type ScheduleOrderProps = {
  pickupDate: Date | null;
  setPickupDate: React.Dispatch<React.SetStateAction<Date | null>>;
  pickupTime: Date | null;
  setPickupTime: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function ScheduleOrder({
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
}: ScheduleOrderProps) {
  const [error, setError] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const minimumDate = new Date();

  const maximumDate = new Date();
  maximumDate.setMonth(maximumDate.getMonth() + 1);

  const closeModal = () => {
    setError("");
  };

  return (
    <ThemedView>
      {showCalender && (
        <DateTimePicker
          value={pickupDate || new Date(2000, 0, 1)}
          mode="date"
          display="calendar"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onDismiss={() => setShowCalender(false)}
          onValueChange={(_, selectedDate) => {
            setShowCalender(false);

            if (selectedDate) {
              setPickupDate(selectedDate);
            }
          }}
        />
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
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
              Pickup Time
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Modal>
      <View style={styles.container}>
        <ReusableButton
          submit={() => setShowCalender(true)}
          buttonText={
            !pickupDate ||
            pickupDate.toDateString() === new Date().toDateString()
              ? "Today"
              : new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }).format(pickupDate)
          }
          buttonStyles={{ alignSelf: "center", width: "50%" }}
        />
        <ReusableButton
          submit={() => setShowDropdown(true)}
          buttonText={pickupTime ? pickupTime.toLocaleTimeString() : "ASAP"}
          buttonStyles={{ alignSelf: "center", width: "50%" }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: globalStyles.themeRed.color,
    borderBottomWidth: 5,
    marginBottom: 10,
  },
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
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
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    borderRadius: 10,
    width: "35%",
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

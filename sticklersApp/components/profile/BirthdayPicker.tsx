import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";

export default function BirthdayPicker() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const maximumDate = new Date();

  const is13OrOlder = (date: Date) => {
    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();

    const monthDiff = today.getMonth() - date.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < date.getDate())
    ) {
      age--;
    }

    return age >= 13;
  };

  return (
    <ThemedView>
      <Pressable
        onPress={() => setShow(true)}
        style={{
          padding: 16,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <ThemedText>
          {birthday ? birthday.toLocaleDateString() : "Select birthday"}
        </ThemedText>
      </Pressable>

      {show && (
        <DateTimePicker
          value={birthday || new Date(2000, 0, 1)}
          mode="date"
          display="spinner"
          maximumDate={maximumDate}
          onValueChange={(_, selectedDate) => {
            setShow(false);

            if (selectedDate) {
              setBirthday(selectedDate);
            }
          }}
        />
      )}
    </ThemedView>
  );
}

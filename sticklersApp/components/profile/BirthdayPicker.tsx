import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialIcons } from "@expo/vector-icons";

type BirthdayPickerProps = {
  maxAge?: number;
  birthday: Date | null;
  setBirthday: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function BirthdayPicker({ maxAge = 13, birthday, setBirthday }: BirthdayPickerProps) {
  const [show, setShow] = useState(false);

  const maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - maxAge);

  return (
    <ThemedView style={{ paddingHorizontal: 1, paddingBottom: 30 }}>
      <ThemedText style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        Birthday (optional)
      </ThemedText>

      <Pressable
        onPress={() => setShow(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: useThemeColor({ light: "#aaa", dark: "#fff" }, "text"),
        }}
      >
        <MaterialIcons name="cake" size={24} color="#aaa" />
        <ThemedText>
          {birthday
            ? birthday.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Select birthday"}{" "}
          {birthday && (
            <Text style={{ fontSize: 12, color: "#aaa" }}>
              ({new Date().getFullYear() - birthday.getFullYear()} years old)
            </Text>
          )}
        </ThemedText>
      </Pressable>

      {show && (
        <DateTimePicker
          value={birthday || new Date(2000, 0, 1)}
          mode="date"
          display="spinner"
          maximumDate={maximumDate}
          onDismiss={() => setShow(false)}
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

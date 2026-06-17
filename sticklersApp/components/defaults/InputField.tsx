import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./themed-text";
import Animated from "react-native-reanimated";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Controller } from "react-hook-form";
import { globalStyles } from "@/styles/global";

type InputFieldProps = {
  control: any;
  controlValue: string;
  errors: any;
  label?: string;
  icon?: any;
  keyboardType?: any;
  isPassword?: boolean;
};

export default function InputField({
  control,
  controlValue,
  errors,
  label = "",
  icon = "question-mark",
  keyboardType = "default",
  isPassword = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const onPress = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={{ paddingHorizontal: 1 }}>
      <ThemedText style={styles.inputLabel}>{label}</ThemedText>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focused ? globalStyles.themeYellow.color : "#aaa",
          },
        ]}
      >
        <MaterialIcons name={icon} size={24} color="#aaa" />
        <Controller
          control={control}
          name={controlValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={keyboardType}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword && !showPassword}
              onBlur={() => {
                onBlur();
                setFocused(false);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onFocus={(e) => setFocused(true)}
            />
          )}
        />
        {isPassword && (
          <Pressable onPress={onPress} style={styles.eyeButton}>
            <View style={styles.eyeWrapper}>
              <Animated.View style={styles.eyeAbsolute}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color={showPassword ? "#aaa" : "#777"}
                />
              </Animated.View>
            </View>
          </Pressable>
        )}
      </View>
      <ThemedText style={styles.error}>
        {errors[controlValue] ? errors[controlValue].message : ""}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputLabel: {
    paddingHorizontal: 5,
    paddingBottom: 2,
  },
  input: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  eyeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  eyeAbsolute: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

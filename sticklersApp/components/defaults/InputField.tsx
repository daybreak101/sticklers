import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./themed-text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/use-theme-color";

type InputFieldProps = {
  text: any;
  setText: React.Dispatch<React.SetStateAction<any>>;
  label?: string;
  icon?: any;
  keyboardType?: any;
  isPassword?: boolean;
};

export default function InputField({
  text,
  setText,
  label,
  icon = "question-mark",
  keyboardType = "default",
  isPassword = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const visible = useSharedValue(0); // 0 = off, 1 = on

  const onPress = () => {
    const next = !showPassword;
    setShowPassword(next);
    visible.value = next ? 1 : 0;
  };

  const eyeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible.value, { duration: 200 }),
  }));

  const eyeOffStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible.value ? 0 : 1, { duration: 200 }),
  }));

  return (
    <KeyboardAvoidingView
      style={{ paddingHorizontal: 1 }}
    >
      <ThemedText style={styles.inputLabel}>{label}</ThemedText>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: useThemeColor({ light: "#aaa", dark: "#fff" }, "text"),
          },
        ]}
      >
        <MaterialIcons name={icon} size={24} color="#aaa" />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          onChangeText={(t) => setText(t)}
          value={text}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <Pressable onPress={onPress} style={styles.eyeButton}>
            <View style={styles.eyeWrapper}>
              <Animated.View style={[eyeOffStyle, styles.eyeAbsolute]}>
                <MaterialIcons name="visibility-off" size={24} color="#777" />
              </Animated.View>
              <Animated.View style={[eyeStyle, styles.eyeAbsolute]}>
                <MaterialIcons name="visibility" size={24} color="#aaa" />
              </Animated.View>
            </View>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputLabel: {
    paddingHorizontal: 10,
    paddingBottom: 10,
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

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { globalStyles } from "@/styles/global";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <ThemedView>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Sign In</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Welcome back, you&apos;ve been missed!
        </ThemedText>
      </View>
      <View style={styles.inputSection}>
        <ThemedText style={styles.inputLabel}>Email</ThemedText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#aaa" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <ThemedText style={styles.inputLabel}>Password</ThemedText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#aaa" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
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
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Pressable onPress={onPress} style={styles.button}>
          <ThemedText style={styles.buttonText}>Sign In</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  inputSection: {},
  inputContainer: {
    backgroundColor: "#4a4a4a",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputLabel: {
    paddingHorizontal: 10,
    paddingTop: 30,
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
  buttonSection: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
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

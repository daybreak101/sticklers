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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const visible = useSharedValue(0); // 0 = off, 1 = on

  const onPress = () => {
    visible.value = visible.value ? 0 : 1;
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
        {/* make box around input, input has invisible border,
            then, that box will have row flex direction:
              1: icon 2: input (flex: 1) 3: eye for password */}
        <ThemedText style={styles.inputLabel}>Email</ThemedText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#777" />
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
          <MaterialIcons name="email" size={24} color="#777" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Pressable onPress={onPress}>
            <View>
              <Animated.View style={eyeOffStyle}>
                <MaterialIcons name="visibility-off" size={24} color="white" />
              </Animated.View>

              <Animated.View style={eyeStyle}>
                <MaterialIcons name="visibility" size={24} color="white" />
              </Animated.View>
            </View>
          </Pressable>
        </View>
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
    padding: 10,
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
});

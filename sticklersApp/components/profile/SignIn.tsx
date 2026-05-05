import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SignIn() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign In</Text>
        <Text style={styles.headerSubtitle}>Welcome back, you&apos;ve been missed!</Text>
      </View>
      <View>
        {/* make box around input, input has invisible border,
            then, that box will have row flex direction:
              1: icon 2: input (flex: 1) 3: eye for password */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {

  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
});

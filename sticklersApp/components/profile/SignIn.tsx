import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { globalStyles } from "@/styles/global";
import InputField from "../defaults/InputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FirebaseError } from "firebase/app";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password is too short"),
  });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const idToken = await userCred.user.getIdToken();
    } catch (err: any) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Incorrect email or password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts");
      } 
      else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Sign In</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Welcome back, you&apos;ve been missed!
        </ThemedText>
      </View>
      <View style={styles.inputSection}>
        <InputField
          control={control}
          controlValue="email"
          errors={errors}
          label="Email"
          icon="email"
        />
        <InputField
          control={control}
          controlValue="password"
          errors={errors}
          label="Password"
          icon="lock"
          isPassword
        />
      </View>
      <View style={styles.buttonSection}>
        <View>
          <ThemedText style={styles.error}>{error}</ThemedText>
        </View>
        <Pressable onPress={handleSubmit(submit)} style={styles.button}>
          <ThemedText style={styles.buttonText}>Sign In</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
  screen: {
    flex: 1,
  },
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
  inputSection: {
    gap: 10,
  },
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
    paddingVertical: 40,
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

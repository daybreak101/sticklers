import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import BirthdayPicker from "./BirthdayPicker";
import InputField from "../defaults/InputField";
import { globalStyles } from "@/styles/global";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableButton from "../defaults/ReusableButton";

export default function SignUp() {
  const [birthday, setBirthday] = useState<Date | null>(null);

  const schema = z
    .object({
      firstName: z.string().trim().min(2, "First Name is too short"),
      lastName: z.string().trim().min(2, "Last Name is too short"),
      email: z.email("Invalid email").transform((v) => v.trim()),
      phone: z
        .string()
        .trim()
        .regex(/^\+?[\d\s()-]{7,20}$/, "Invalid phone number"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[0-9]/, "Must contain a number"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const submit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.replace(/\D/g, ""),
        birthday: birthday ?? null,
      });

      await sendEmailVerification(userCredential.user);
      console.log("Email sent");
      router.push("/profile/verifyEmail");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to login. Please check your email and password");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <View>
        <ThemedText style={styles.headerTitle}>Create An Account</ThemedText>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.inputSection}>
          <InputField
            control={control}
            controlValue="firstName"
            errors={errors}
            label="First Name"
            icon="person"
          />
          <InputField
            control={control}
            controlValue="lastName"
            errors={errors}
            label="Last Name"
            icon="person"
          />
          <BirthdayPicker birthday={birthday} setBirthday={setBirthday} />
          <InputField
            control={control}
            controlValue="email"
            errors={errors}
            label="Email"
            icon="email"
          />
          <InputField
            control={control}
            controlValue="phone"
            errors={errors}
            label="Phone Number"
            icon="phone"
          />
          <InputField
            control={control}
            controlValue="password"
            errors={errors}
            label="Password"
            icon="lock"
            isPassword
          />
          <InputField
            control={control}
            controlValue="confirmPassword"
            errors={errors}
            label="Confirm Password"
            icon="lock"
            isPassword
          />
          <View style={styles.buttonSection}>
            <View>
              <ThemedText style={styles.error}>{error}</ThemedText>
            </View>
            <ReusableButton submit={handleSubmit(submit)} buttonText="Sign Up" buttonStyles={{ alignSelf: "center", width: "50%" }} />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  error: {
    width: "100%",
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
  screen: {
    flex: 1,
  },
  inputSection: {
    gap: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#4a4a4a",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonSection: {
    paddingVertical: 20,
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

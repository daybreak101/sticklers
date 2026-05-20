import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";

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
import InputField from "@/components/defaults/InputField";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import BirthdayPicker from "@/components/profile/BirthdayPicker";
import { useAuth } from "@/context/AuthContext";
import ChangeEmail from "@/components/profile/ChangeEmail";

export default function EditProfile() {
  const { user, profile } = useAuth();
  const [birthday, setBirthday] = useState<Date | null>(profile?.birthday ?? null);

  const schema = z
    .object({
      firstName: z.string().min(2, "First Name is too short"),
      lastName: z.string().min(2, "Last Name is too short"),
      email: z.email("Invalid email"),
    })
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      email: profile?.email ?? "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  if(!user) return <></>;
  
  const submit = async (data: FormData) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: birthday ?? null,
      }, { merge: true });
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
          <View style={styles.buttonSection}>
            <View>
              <ThemedText style={styles.error}>{error}</ThemedText>
            </View>
            <Pressable onPress={handleSubmit(submit)} style={styles.button}>
              <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
            </Pressable>
          </View>
          <ChangeEmail />
        </View>
      </ScrollView>
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
  inputSection: {
    paddingVertical: 20,
    gap: 20,
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

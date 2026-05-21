import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import z, { email } from "zod";
import { globalStyles } from "@/styles/global";
import { ThemedView } from "../defaults/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "../defaults/themed-text";
import InputField from "../defaults/InputField";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { useRouter } from "expo-router";

export default function ChangeEmail() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const schema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password is too short"),
  });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  const closeModal = () => {
    reset();
    setError("");
    setShow(false);
  };

  const changeEmail = async (data: FormData) => {
    try {
      if (!user || !user.email) return;
      const credential = EmailAuthProvider.credential(
        user.email,
        data.password,
      );
      await reauthenticateWithCredential(user, credential);
      await verifyBeforeUpdateEmail(user, data.email);
      await setDoc(
        doc(db, "users", user.uid),
        {
          pendingEmail: data.email,
        },
        { merge: true },
      );
      await refreshUser();
      setShowMessage(true);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email change is not allowed");
      } else {
        setError(err.message);
      }
    } finally {
    }
  };

  return (
    <ThemedView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView
            style={[
              styles.modal,
              {
                backgroundColor: useThemeColor(
                  { light: "#fff", dark: "#343434" },
                  "background",
                ),
              },
            ]}
          >
            {showMessage ? (
              <View>
                <ThemedText style={styles.message}>
                  We sent a verification link to your new email address. Once you confirm it, your email will be updated automatically. You may need to reopen the app to see the change.
                </ThemedText>
                <Pressable onPress={closeModal} style={[styles.button, { marginTop: 15, alignSelf: "center" }]}>
                  <ThemedText>Close</ThemedText>
                </Pressable>
              </View>
            ) : ( <View>
              <InputField
                control={control}
                controlValue="email"
                errors={errors}
                label="Enter new email"
                icon="email"
              />
              <InputField
                control={control}
                controlValue="password"
                errors={errors}
                label="In order to change your email, you will need to enter your current password."
                icon="lock"
                isPassword
              />
              <ThemedText style={styles.error}>{error}</ThemedText>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Pressable onPress={closeModal} style={styles.button}>
                  <ThemedText>Cancel</ThemedText>
                </Pressable>
                <Pressable
                  onPress={handleSubmit(changeEmail)}
                  style={styles.button}
                >
                  <ThemedText>Confirm</ThemedText>
                </Pressable>
              </View>
            </View> )}
          </ThemedView>
        </ThemedView>
      </Modal>
      <Pressable
        onPress={() => setShow(true)}
        style={[styles.button, { alignSelf: "center" }]}
      >
        <ThemedText style={styles.buttonText}>Change Email</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

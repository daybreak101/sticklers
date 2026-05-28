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
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { useRouter } from "expo-router";
import ReusableButton from "../defaults/ReusableButton";

export default function ChangePassword() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const schema = z
    .object({
      // email: z.email("Invalid email"),
      currentPassword: z.string().min(6, "Password is too short"),
      newPassword: z.string().min(6, "Password is too short"),
      confirmPassword: z.string().min(6, "Password is too short"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
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
      //   email: user?.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const closeModal = () => {
    reset();
    setError("");
    setShow(false);
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/(tabs)/profile");
  };

  const changePassword = async (data: FormData) => {
    try {
      if (!user || !user.email) return;
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, data.newPassword);
      setShowMessage(true);
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
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
        animationType="slide"
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
            <ThemedText style={[globalStyles.title, styles.header]}>
              Change Password
            </ThemedText>
            {showMessage ? (
              <View>
                <ThemedText style={styles.message}>
                  Password changed successfully. Please log in again with your
                  updated password.
                </ThemedText>
                <Pressable
                  onPress={logout}
                  style={[
                    styles.button,
                    { marginTop: 15, alignSelf: "center" },
                  ]}
                >
                  <ThemedText>Close</ThemedText>
                </Pressable>
              </View>
            ) : (
              <View>
                <InputField
                  control={control}
                  controlValue="currentPassword"
                  errors={errors}
                  label="Enter Current Password"
                  icon="lock"
                  isPassword
                />
                <InputField
                  control={control}
                  controlValue="newPassword"
                  errors={errors}
                  label="Enter New Password"
                  icon="lock"
                  isPassword
                />
                <InputField
                  control={control}
                  controlValue="confirmPassword"
                  errors={errors}
                  label="Confirm New Password"
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
                  <ReusableButton submit={closeModal} buttonText="Cancel" buttonStyles={styles.button} />
                  <ReusableButton submit={handleSubmit(changePassword)} buttonText="Confirm" buttonStyles={styles.button} />
                </View>
              </View>
            )}
          </ThemedView>
        </ThemedView>
      </Modal>
      <ReusableButton submit={() => setShow(true)} buttonText="Change Password" buttonStyles={{ alignSelf: "center", width: "50%" }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: globalStyles.themeRed.color,
    borderBottomWidth: 5,
    marginBottom: 10,
  },
  error: {
    color: "#ff0000",
    fontSize: 15,
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
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

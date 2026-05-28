import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { CartItem } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { globalStyles } from "@/styles/global";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../defaults/InputField";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type CredentialModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CredentialModal({
  show,
  setShow,
}: CredentialModalProps) {
  const { user } = useAuth();
  const [error, setError] = useState("");

  const schema = z.object({
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
      password: "",
    },
  });

  const deleteAccount = async (data: FormData) => {
    if (!user || !user.email) return;
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        data.password,
      );
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await setDoc(
        doc(db, "users", user.uid),
        {
          isDeleted: true,
        },
        { merge: true },
      );
      setShow(false);
    } catch (err: any) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Incorrect password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts");
      } else {
        setError(err.message);
      }
    } finally {
    }
  };

  const closeModal = () => {
    reset();
    setError("");
    setShow(false);
  };

  return (
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
            Delete Account
          </ThemedText>
          <ThemedText style={styles.message}>
            Are you sure you want to delete your account?
          </ThemedText>
          <InputField
            control={control}
            controlValue="password"
            errors={errors}
            label="Enter your password to confirm."
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
              <ThemedText style={styles.buttonText}>No</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleSubmit(deleteAccount)}
              style={styles.button}
            >
              <ThemedText style={styles.buttonText}>Yes</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
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

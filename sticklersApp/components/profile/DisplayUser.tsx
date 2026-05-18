import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function DisplayUser() {
  const { user, profile } = useAuth();

  const logout = async () => {
    await signOut(auth);
  }


  return (
    <View>
      <Text>DisplayUser</Text>
      <Text>{user?.email}</Text>
      <Text>{profile?.firstName}</Text>
      <Text>{profile?.lastName}</Text>
      <Text>{profile?.email}</Text>
      <Text>{profile?.birthday && profile?.birthday?.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}</Text>
      <Text>{user?.emailVerified}</Text>
      <Text onPress={logout}>Logout</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
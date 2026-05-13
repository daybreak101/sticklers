import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '../defaults/themed-view';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function SignInOrUp() {
  const [toggle, setToggle] = useState(false);

  return (
    <ThemedView>
        {toggle ? <SignUp /> : <SignIn />}
    </ThemedView>
  )
}

const styles = StyleSheet.create({})
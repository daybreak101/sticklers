import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function OrderConfirmationScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Order Confirmed" }} />
      <Text>orderConfirmation</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
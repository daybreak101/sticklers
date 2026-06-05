import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ThemedView } from '@/components/defaults/themed-view'
import { globalStyles } from '@/styles/global'
import { ThemedText } from '@/components/defaults/themed-text'

export default function OrderConfirmationScreen() {
  // TODO: this screen cannot be able to navigate back to checkout
  // TODO: add a button that will navigate back to cart screen, with it empty
  // TODO: send order information from checkout to this screen
  // TODO: send order confirmation email???
  // TODO: save order to recent orders

  return (
    <ThemedView style={[globalStyles.page, { paddingBottom: 0 }]}>
      <Stack.Screen options={{ title: "Order Confirmed" }} />
      <ThemedText>Thank you for ordering with Sticklers!</ThemedText>
      <ThemedText>Your order will be ready for pickup in 15 minutes.</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})
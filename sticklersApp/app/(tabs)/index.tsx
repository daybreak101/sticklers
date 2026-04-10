import ParallaxScrollView from '@/components/defaults/parallax-scroll-view';
import { ThemedText } from '@/components/defaults/themed-text';
import { ThemedView } from '@/components/defaults/themed-view';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Menu Categories</ThemedText>
      {/* <ParallaxScrollView>

      </ParallaxScrollView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

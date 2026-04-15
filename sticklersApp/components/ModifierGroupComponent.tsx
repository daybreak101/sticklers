import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./defaults/themed-text";
import { ModifierGroup } from "@/types/menu";

export default function ModifierGroupComponent({
  group,
  handleSelectionChange,
}: {
  group: ModifierGroup;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Pressable key={group.id} onPress={() => setCollapsed((prev) => !prev)}>
      <View style={styles.groupHeader}>
        <ThemedText>{group.name}</ThemedText>
      </View>
      <View
        style={[
          styles.groupContainer,
          { display: collapsed ? "none" : "flex" },
        ]}
      >
        {group.options.map((option, index) => (
          <View key={option.id} style={styles.optionContainer}>
            <View style={styles.optionRow}>
              <ThemedText style={styles.optionText}>{option.name}</ThemedText>

              {option.price && option.price !== 0 && (
                <ThemedText style={styles.optionPrice}>
                  ${option.price.toFixed(2)}
                </ThemedText>
              )}
            </View>

            {index !== group.options.length - 1 && (
              <View style={styles.lineBreak}></View>
            )}
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  groupHeader: {
    padding: 10,
    backgroundColor: "rgb(54, 51, 51)",
  },
  lineBreak: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 10,
  },
  groupContainer: {
    padding: 10,
    width: "100%",
  },
  optionContainer: {
    padding: 10,
    width: "100%",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 15,
  },
  optionPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: "rgb(232, 70, 70)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";
import { ThemedText } from "./defaults/themed-text";
import { Checkbox } from "expo-checkbox";
import { SelectedModifiers } from "@/types/cart";

export default function ModifierOptionCheckboxComponent({
  item,
  option,
  group,
  index,
  selectedModifiers,
  handleSelectionChange,
}: {
  item: Item;
  option: ModifierOption;
  group: ModifierGroup;
  index: number;
  selectedModifiers: SelectedModifiers;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
}) {
  //check if default here!!!
  const [isChecked, setIsChecked] = useState(
    selectedModifiers[group.id]?.includes(option.id) || false,
  );
  
  return (
    <Pressable
      style={styles.optionContainer}
      onPress={() => {
        setIsChecked((prev) => !prev);
        handleSelectionChange(group, option.id);
      }}
    >
      <View style={styles.optionRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Checkbox
            value={isChecked}
            onValueChange={(value) => setIsChecked(value)}
            style={styles.checkbox}
          />
          <ThemedText style={styles.optionText}>{option.name}</ThemedText>
        </View>

        {option.price !== 0 && (
          <ThemedText style={styles.optionPrice}>
            {`${group.priceType === "add" ? "+" : ""}$${option.price === null ? item.basePrice.toFixed(2) : option.price?.toFixed(2)}`}
          </ThemedText>
        )}
      </View>

      {index !== group.options.length - 1 && (
        <View style={styles.lineBreak}></View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {},
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
    alignSelf: "center",
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgb(232, 70, 70)",
  },
  lineBreak: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 10,
  },
});

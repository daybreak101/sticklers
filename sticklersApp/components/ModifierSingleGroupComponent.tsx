import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./defaults/themed-text";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";

export default function ModifierSingleGroupComponent({
  item,
  group,
}: {
  item: Item;
  group: ModifierGroup;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View>
      {group.options.map((option, index) => {
        const selected = selectedId === option.id;

        return (
          <View key={option.id}>
            <Pressable
              
              style={[styles.optionContainer, styles.optionRow]}
              onPress={() => {
                setSelectedId(option.id);
                //handleSelectionChange(group, option.id);
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View
                  style={[
                    styles.radioOuter,
                    selected && styles.radioOuterActive,
                  ]}
                >
                  {selected && <View style={styles.radioInner} />}
                </View>
                <ThemedText style={styles.optionText}>{option.name}</ThemedText>
              </View>
              {option.price !== 0 && (
                <ThemedText style={styles.optionPrice}>
                  {`${group.priceType === "add" ? "+" : ""}$${option.price === null ? item.basePrice.toFixed(2) : option.price?.toFixed(2)}`}
                </ThemedText>
              )}
            </Pressable>
            {index !== group.options.length - 1 && (
              <View style={styles.lineBreak}></View>
            )}
          </View>
        );
      })}
    </View>
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

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: "rgb(232, 70, 70)",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgb(232, 70, 70)",
  },
});

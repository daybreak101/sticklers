import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";
import { Checkbox } from "expo-checkbox";
import { SelectedModifiers } from "@/types/cart";
import { ThemedText } from "../defaults/themed-text";
import SingleModifierModal from "./SingleModifierModal";
import { globalStyles } from "@/styles/global";

export default function SingleModifierSelectionComponent({
  item,
  group,
  selectedModifiers,
  handleSelectionChange,
}: {
  item: Item;
  group: ModifierGroup;
  selectedModifiers: SelectedModifiers;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
}) {
  const [modifiers, setModifiers] = useState<ModifierOption[]>([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ModifierOption | null>(null);

  useEffect(() => {
    setModifiers(group.options);
  }, [selectedModifiers, group]);

  useEffect(() => {
    if (!selected) return;
    handleSelectionChange(group, selected.id);
  }, [selected]);

  const returnPrice = (option: ModifierOption | null): string => {
    if (!option) return "";
    let displayPrice = group.priceType === "add" ? "+$" : "$";
    if (group.priceType === "define") {
      displayPrice += item.pricingRules[group.id][option.id].toFixed(2);
    } else if (option.price === null) {
      displayPrice += item.basePrice?.toFixed(2);
    } else if (option.price !== 0) {
      displayPrice += option.price?.toFixed(2);
    } else {
      return "";
    }

    return displayPrice;
  };

  return (
    <View>
      <SingleModifierModal
        show={show}
        setShow={setShow}
        modifiers={modifiers}
        group={group}
        handleSelectionChange={handleSelectionChange}
      />
      <ThemedText style={styles.title}>{group.name}</ThemedText>
      {selectedModifiers[group.id]?.map((optionId) => (
        <View key={optionId} style={styles.optionRow}>
          <Pressable
            style={styles.optionContainer}
            onPress={() => {
              setSelected(group.options.find((o) => o.id === optionId) ?? null);
              setShow(true);
            }}
          >
            <View style={[styles.optionText, { flexDirection: "row", justifyContent: "space-around"}]}>
              <ThemedText style={styles.optionText}>
                {group.options.find((o) => o.id === optionId)?.name}
              </ThemedText>
              <ThemedText style={styles.optionPrice}>
                {returnPrice(
                  group.options.find((o) => o.id === optionId) ?? null,
                )}
              </ThemedText>
            </View>
          </Pressable>
        </View>
      ))}
      {/* {modifiers.length > 0 && (
        <Pressable
          style={styles.optionContainer}
          onPress={() => {
            setSelected(null);
            setShow(true);
          }}
        >
          <ThemedText style={styles.optionText}>Add {group.name}</ThemedText>
        </Pressable>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: globalStyles.themeRedBright.color,
    borderTopWidth: 0.5,
    borderTopColor: globalStyles.themeRedBright.color,
  },
  checkbox: {},
  optionContainer: {
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: globalStyles.themeRedBright.color,
  },
  optionRow: {
    padding: 10,
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

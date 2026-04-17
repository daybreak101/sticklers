import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectedModifiers } from "@/types/cart";
import { Item, ModifierGroup } from "@/types/menu";
import { getModifierGroups } from "@/lib/menuStorage";
import { ThemedText } from "./defaults/themed-text";
import ModifierMultiGroupComponent from "./ModifierMultiGroupComponent";
import ModifierSingleGroupComponent from "./ModifierSingleGroupComponent";

export default function ModifiersList({
  selectedModifiers,
  setSelectedModifiers,
  item,
}: {
  selectedModifiers: SelectedModifiers;
  setSelectedModifiers: React.Dispatch<React.SetStateAction<SelectedModifiers>>;
  item: Item;
}) {
  const [modifiers, setModifiers] = useState<ModifierGroup[]>([]);

  useEffect(() => {
    loadModifiers();
  }, [item]);

  const loadModifiers = async () => {
    const modifiers = await getModifierGroups();
    const groups =
      (item.modifierGroupIds?.map((id) =>
        modifiers.find((m) => m.id === id),
      ) as ModifierGroup[]) || null;
    setModifiers(groups || []);
  };

  const handleSelectionChange = (group: ModifierGroup, optionId: string) => {
    setSelectedModifiers((prev) => {
      const current = prev[group.id] || [];

      if (group.type === "single") {
        return {
          ...prev,
          [group.id]: [optionId],
        };
      }

      // multi select
      const exists = current.includes(optionId);

      return {
        ...prev,
        [group.id]: exists
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <ThemedText style={styles.headerText}>Modifiers</ThemedText>
      </View>

      {modifiers.map((group) => (
        <ModifierMultiGroupComponent
          key={group.id}
          item={item}
          group={group}
          handleSelectionChange={handleSelectionChange}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  headerBanner: {
    padding: 10,
    backgroundColor: "rgba(104, 33, 29)",
  },
  headerText: {
    color: "white",
    fontWeight: 300,
    fontSize: 20,
    paddingHorizontal: 10,
  },
});

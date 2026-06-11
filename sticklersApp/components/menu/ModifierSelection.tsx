import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";
import { Checkbox } from "expo-checkbox";
import { SelectedModifiers } from "@/types/cart";
import { ThemedText } from "../defaults/themed-text";
import ModifierModal from "./ModifierModal";

export default function ModifierOptionCheckboxComponent({
  group,
  selectedModifiers,
  handleSelectionChange,
}: {
  group: ModifierGroup;
  selectedModifiers: SelectedModifiers;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
}) {
  const [remainingModifiers, setRemainingModifiers] = useState<
    ModifierOption[]
  >([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ModifierOption | null>(null);

  useEffect(() => {
    if(group.type === "multi") return;
    setRemainingModifiers(
      group.options.filter(
        (option) => !selectedModifiers[group.id]?.includes(option.id),
      ),
    );
  }, [selectedModifiers]);

  return (
    <View>
      <ModifierModal
        show={show}
        setShow={setShow}
        modifiers={
          selected ? [selected, ...remainingModifiers] : remainingModifiers
        }
        group={group}
        handleSelectionChange={handleSelectionChange}
      />
      {selectedModifiers[group.id]?.map((optionId) => (
        <Pressable
          key={optionId}
          style={styles.optionContainer}
          onPress={() => {
            setSelected(group.options.find((o) => o.id === optionId) ?? null);
            setShow(true);
          }}
        >
          <ThemedText style={styles.optionText}>
            {group.options.find((o) => o.id === optionId)?.name} -{" "}
            {group.options.find((o) => o.id === optionId)?.price}
          </ThemedText>
        </Pressable>
      ))}
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
});

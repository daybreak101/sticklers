import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { SelectedModifiers } from "@/types/cart";
import { Item, ModifierGroup } from "@/types/menu";
import { getModifierGroups } from "@/lib/menuStorage";
import { ThemedText } from "./defaults/themed-text";
import ModifierSelectionComponent from "./ModifierSelectionComponent";

export default function ModifiersList({
  selectedModifiers,
  setSelectedModifiers,
  item,
}: {
  selectedModifiers: SelectedModifiers;
  setSelectedModifiers: React.Dispatch<React.SetStateAction<SelectedModifiers>>;
  item: Item;
}) {
  const allModsRef = useRef<ModifierGroup[]>([]);
  const [modifiers, setModifiers] = useState<ModifierGroup[]>([]);

  type LastChange = { group: ModifierGroup | null; optionId: string };
  const [lastChange, setLastChange] = useState<LastChange>({
    group: null,
    optionId: "",
  });

  useEffect(() => {
    loadModifiers();
  }, [item]);

  const loadModifiers = async () => {
    const modifiers = await getModifierGroups();
    const groups =
      (item.modifierGroupIds?.map((id) =>
        modifiers.find((m) => m.id === id),
      ) as ModifierGroup[]) || null;
    console.log("groups", groups);
    setModifiers(groups || []);
    allModsRef.current = groups || [];
  };

const filteredModifiers = useMemo(() => {
  let updated = [...modifiers];

  // loop through ALL selected modifiers
  for (const groupId in selectedModifiers) {
    const selectedOptionIds = selectedModifiers[groupId];
    const group = modifiers.find((g) => g.id === groupId);
    if (!group) continue;

    selectedOptionIds.forEach((optionId) => {
      const option = group.options.find((o) => o.id === optionId);
      if (!option || !option.effects) return;

      option.effects.forEach((effect) => {
        const { groupId: targetGroupId, allowedOptions } = effect;

        updated = updated.map((g) => {
          if (g.id !== targetGroupId) return g;

          return {
            ...g,
            options: g.options.filter((o) =>
              allowedOptions?.includes(o.id)
            ),
          };
        });
      });
    });
  }

  return updated;
}, [modifiers, selectedModifiers]);

useEffect(() => {
  if (!lastChange.group) return;

  const option = lastChange.group.options.find(
    (o) => o.id === lastChange.optionId
  );
  if (!option || !option.effects) return;

  setSelectedModifiers((prev) => {
    let updated = { ...prev };
    let changed = false;
    option.effects?.forEach((effect) => {
      const { groupId, allowedOptions, forceOption } = effect;

      const currentSelected = updated[groupId]?.[0];

      if (!allowedOptions?.includes(currentSelected)) {
        const next = forceOption ? [forceOption] : [];

        // only update if actually different
        if (
          JSON.stringify(updated[groupId]) !== JSON.stringify(next)
        ) {
          updated[groupId] = next;
          changed = true;
        }
      }
    });

    return changed ? updated : prev; // 👈 prevents infinite loop
  });
}, [lastChange]);

  const handleSelectionChange = (group: ModifierGroup, optionId: string) => {
    console.log("handleSelectionChange", group, optionId);
    setLastChange({ group, optionId });
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
    console.log("change detected");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <ThemedText style={styles.headerText}>Modifiers</ThemedText>
      </View>

      {filteredModifiers.map((group) => (
        <ModifierSelectionComponent
          key={group.id}
          item={item}
          group={group}
          handleSelectionChange={handleSelectionChange}
          selectedModifiers={selectedModifiers}
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

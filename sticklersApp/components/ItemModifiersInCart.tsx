import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getModifierGroups } from "@/lib/menuStorage";
import { ThemedText } from "./defaults/themed-text";
import { ModifierGroup } from "@/types/menu";
import { NonDefaultModifier } from "@/types/cart";

type ItemModifiersInCartProps = {
  item: [string, NonDefaultModifier[]];
};

export default function ItemModifiersInCart({
  item,
}: ItemModifiersInCartProps) {
  const [groupId, optionIds] = item;
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
  
  useEffect(() => {
    const loadGroups = async () => {
      const groups = await getModifierGroups();
      setModifierGroups(groups);
    };
    loadGroups();
  }, []);

  //const group = modifierGroups.find((g) => g.id === groupId);
  return (
    <ThemedText>
      {groupId}: {optionIds.join(", ")}
    </ThemedText>
  );
}

const styles = StyleSheet.create({});

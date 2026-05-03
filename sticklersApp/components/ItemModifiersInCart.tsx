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
  const [groupId, options] = item;
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
    <View>
      {options.length > 0 && (
        <View>
          <ThemedText style={styles.groupHeader}>{groupId}</ThemedText>
          {options.map((option) => (
            <View style={styles.option} key={option.option}>
              <ThemedText style={styles.optionText}>{option.option}</ThemedText>
              {option.price > 0 && <ThemedText style={styles.optionPrice}>${option.price.toFixed(2)}</ThemedText>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  groupHeader: {
    paddingTop: 5,
    fontWeight: 600,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
  option: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
    overflow: "hidden",
    fontSize: 14,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: 600,
    overflow: "hidden",
    width: 50,
  },
});

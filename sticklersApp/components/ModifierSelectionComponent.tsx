import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./defaults/themed-text";
import { Item, ModifierGroup } from "@/types/menu";
import ModifierSingleGroupComponent from "./ModifierSingleGroupComponent";
import { SelectedModifiers } from "@/types/cart";
import ModifierMultiGroupComponent from "./ModifierMultiGroupComponent";

export default function ModifierGroupComponent({
  item,
  group,
  handleSelectionChange,
  selectedModifiers,
}: {
  item: Item;
  group: ModifierGroup;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
  selectedModifiers: SelectedModifiers;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View key={group.id}>
      <Pressable
        style={styles.groupHeader}
        onPress={() => setCollapsed((prev) => !prev)}
      >
        <ThemedText>{group.name}</ThemedText>
      </Pressable>
      <View
        style={[
          styles.groupContainer,
          { display: collapsed ? "none" : "flex" },
        ]}
      >
        {group.type === "multi" ? (
          group.options.map((option, index) => (
            <ModifierMultiGroupComponent
              key={option.id}
              item={item}
              option={option}
              group={group}
              index={index}
              selectedModifiers={selectedModifiers}
              handleSelectionChange={handleSelectionChange}
            />
          ))
        ) : (
          <ModifierSingleGroupComponent
            key={group.id}
            item={item}
            group={group}
            handleSelectionChange={handleSelectionChange}
            selectedModifiers={selectedModifiers}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupHeader: {
    padding: 10,
    backgroundColor: "rgb(54, 51, 51)",
  },
  groupContainer: {
    padding: 10,
    width: "100%",
  },
});

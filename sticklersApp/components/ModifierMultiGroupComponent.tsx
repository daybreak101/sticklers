import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./defaults/themed-text";
import { Item, ModifierGroup } from "@/types/menu";
import ModifierOptionCheckboxComponent from "./ModifierOptionCheckboxComponent";
import ModifierSingleGroupComponent from "./ModifierSingleGroupComponent";

export default function ModifierGroupComponent({
  item,
  group,
  handleSelectionChange,
}: {
  item: Item;
  group: ModifierGroup;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
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
            <ModifierOptionCheckboxComponent
              key={option.id}
              item={item}
              option={option}
              group={group}
              index={index}
            />
          ))
        ) : (
          <ModifierSingleGroupComponent
            key={group.id}
            item={item}
            group={group}
            // handleSelectionChange={handleSelectionChange}
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

import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";
import { SelectedModifiers } from "@/types/cart";
import { ThemedText } from "../defaults/themed-text";
import { globalStyles } from "@/styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import ReusableButton from "../defaults/ReusableButton";
import ModifierModal from "./ModifierModal";

export default function ModifierSelectionComponent({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const returnPrice = (option: ModifierOption | null, index: number): string => {
    if (!option) return "";
    let displayPrice = group.priceType === "add" ? "+$" : "$";
    if (group.priceType === "define") {
      displayPrice += item.pricingRules[group.id][option.id].toFixed(2);
    } else if (option.price === null) {
      displayPrice += item.basePrice?.toFixed(2);
    } else if (option.price !== 0) {
      if (item.defaults[group.id].includes(option.id)) {
        return "Included";
      }
      displayPrice += option.price?.toFixed(2);
    } else {
      if (item.pricingRules[group.id] && index >= item.pricingRules[group.id].includedCount &&
        item.pricingRules[group.id].includedCount < selectedModifiers[group.id]?.length) {
        return displayPrice + item.pricingRules[group.id].extraItemPrice?.toFixed(2);
      }
      return "";
    }

    return displayPrice;
  };

  return (
    <View>
      <ModifierModal
        menuItem={item}
        show={show}
        setShow={setShow}
        modifiers={modifiers}
        group={group}
        handleSelectionChange={handleSelectionChange}
        selectedModifiers={selectedModifiers}
      />
      <ThemedText style={styles.title}>{group.name}</ThemedText>
      {group.type === "single" &&
        selectedModifiers[group.id]?.map((optionId, index) => (
          <View key={optionId} style={styles.optionRow}>
            <Pressable
              style={styles.optionContainer}
              onPress={() => {
                setSelected(
                  group.options.find((o) => o.id === optionId) ?? null,
                );
                setShow(true);
              }}
            >
              <View
                style={[
                  styles.optionText,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: 35,
                  },
                ]}
              >
                <ThemedText style={styles.optionText}>
                  {group.options.find((o) => o.id === optionId)?.name}
                </ThemedText>

                <ThemedText style={styles.optionPrice}>
                  {returnPrice(
                    group.options.find((o) => o.id === optionId) ?? null, index
                  )}
                </ThemedText>
              </View>
            </Pressable>
          </View>
        ))}
      {group.type === "multi" && (
        <View style={styles.optionRow}>
          {selectedModifiers[group.id]?.map((optionId, index) => (
            <View
              key={optionId}
              style={[
                styles.optionContainer,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingLeft: 45,
                },
              ]}
            >
              <ThemedText style={styles.optionText}>
                {group.options.find((o) => o.id === optionId)?.name}
              </ThemedText>
              <View style={{ flex: 1 }}></View>
              <ThemedText style={[styles.optionPrice, { paddingRight: 10 }]}>
                {returnPrice(
                  group.options.find((o) => o.id === optionId) ?? null, index
                )}
              </ThemedText>
              <Pressable
                onPress={() => {
                  handleSelectionChange(group, optionId);
                }}
              >
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="#727272"
                  style={{ paddingRight: 10 }}
                />
              </Pressable>
            </View>
          ))}
        </View>
      )}
      {group.type === "multi" &&
        selectedModifiers[group.id]?.length !== modifiers.length && (
          <ReusableButton
            submit={() => {
              setSelected(null);
              setShow(true);
            }}
            buttonText={`Add more ${group.name}`}
            buttonStyles={{
              width: "95%",
              marginBottom: 10,
              alignSelf: "center",
            }}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
   // borderBottomColor: globalStyles.themeRedBright.color,
    borderTopWidth: 0.5,
    //borderTopColor: globalStyles.themeRedBright.color,
    backgroundColor: "rgba(160, 160, 160, 0.5)",
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

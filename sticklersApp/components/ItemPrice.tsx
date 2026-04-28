import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Item, ModifierGroup } from "@/types/menu";
import { SelectedModifiers } from "@/types/cart";
import { ThemedText } from "./defaults/themed-text";

type ItemPriceProps = {
  item: Item;
  modifierGroups: ModifierGroup[];
  selectedModifiers: SelectedModifiers;
  quantity: number;
  totalPrice: number;
};

export default function ItemPrice({
  item,
  modifierGroups,
  selectedModifiers,
  quantity,
  totalPrice,
}: ItemPriceProps) {
  totalPrice = useMemo(() => {
    if (!item) return 0;

    let newBase = item.basePrice ?? 0;
    let modifierPrice = 0;

    //for each modifier group in SELECTED MODIFIERS
    for (const groupId in selectedModifiers) {
      const groupData = modifierGroups.find((g) => g.id === groupId);
      //get the current modifier group id
      const selectedOptionIds = selectedModifiers[groupId];

      //for each modifier option in the modifier group...
      selectedOptionIds.forEach((optionId) => {
        //find option data from dataset
        const option = groupData?.options.find((o) => o.id === optionId);
        if (!option) return;

        //if option changes base price
        if(groupData?.priceType === "define") {
          newBase = item.pricingRules[groupId][optionId] ?? item.basePrice ?? 0;
          return;
        }
        else if (groupData?.priceType === "override") {
          newBase = option.price ?? item.basePrice ?? 0;
          return;
        }
        //else, if option is not included in defaults, add it's price to total. 
        else if(!item.defaults[groupId].includes(optionId)) {
          modifierPrice += option.price ?? 0;
        } 
      });

      if(item.pricingRules && item.pricingRules[groupId]) {
        let overrage = selectedOptionIds.length - item.pricingRules[groupId].includedCount;
        //special case, keep for now
        if(selectedOptionIds.includes("boiled_eggs")) {
          overrage--;
        }
        if(overrage > 0) {
          modifierPrice += item.pricingRules[groupId].extraItemPrice * overrage;
        }
      }
    }

    return (newBase + modifierPrice) * quantity;
  }, [item, modifierGroups, selectedModifiers, quantity]);

  return (
    <View style={styles.bottomBarTop}>
      <ThemedText style={styles.totalText}>Total</ThemedText>
      <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBarTop: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "rgb(232, 70, 70)",
  },
  totalText: { fontSize: 20, textAlign: "center", paddingLeft: 10 },
});

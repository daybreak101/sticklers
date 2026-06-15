import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "../defaults/themed-view";
import { ThemedText } from "../defaults/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { globalStyles } from "@/styles/global";
import { Item, ModifierGroup, ModifierOption } from "@/types/menu";
import { MaterialIcons } from "@expo/vector-icons";
import { SelectedModifiers } from "@/types/cart";
import ReusableButton from "../defaults/ReusableButton";

type ModifierModalProps = {
  menuItem: Item;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  modifiers: ModifierOption[];
  group: ModifierGroup;
  handleSelectionChange: (group: ModifierGroup, optionId: string) => void;
  selectedModifiers: SelectedModifiers;
};

export default function ModifierModal({
  menuItem,
  show,
  setShow,
  modifiers,
  group,
  handleSelectionChange,
  selectedModifiers,
}: ModifierModalProps) {
  const returnPrice = (option: ModifierOption | null): string => {
    if (!option) return "";
    let displayPrice = group.priceType === "add" ? "+$" : "$";
    if (group.priceType === "define") {
      displayPrice += menuItem.pricingRules[group.id][option.id].toFixed(2);
    } else if (option.price === null) {
      displayPrice += menuItem.basePrice?.toFixed(2);
    } else if (option.price !== 0) {
      if (menuItem.defaults[group.id].includes(option.id)) {
        return "Included";
      }
      displayPrice += option.price?.toFixed(2);
    } else {
      // if (menuItem.pricingRules[group.id] &&
      //   menuItem.pricingRules[group.id].includedCount <= selectedModifiers[group.id]?.length) {
      //   return displayPrice + menuItem.pricingRules[group.id].extraItemPrice?.toFixed(2);
      // }
      return "";
    }

    return displayPrice;
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={() => {}}
    >
      <ThemedView style={styles.modalContainer}>
        <ThemedView
          style={[
            styles.modal,
            {
              backgroundColor: useThemeColor(
                { light: "#fff", dark: "#343434" },
                "background",
              ),
              paddingBottom: 20
            },
          ]}
        >
          <ThemedText style={[globalStyles.title, styles.header]}>
            Select Option
          </ThemedText>
          <ThemedText
            style={[
              styles.message,
              { textTransform: "uppercase", paddingTop: 10 },
            ]}
          >
            {group.name}
          </ThemedText>

          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 10,
              maxHeight: "70%",
            }}
          >
            <FlatList
              data={modifiers}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderBottomColor: "rgba(255, 255, 255, 0.2)",
                    borderBottomWidth: 0.5,
                    marginVertical: 10,
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  key={item.id}
                  style={[
                    {
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      paddingVertical: 10,
                      width: "100%",
                    },
                  ]}
                  onPress={() => {
                    handleSelectionChange(group, item.id);
                    if (group.type === "single") {
                      setShow(false);
                    }
                  }}
                >
                  {group.type === "multi" &&
                    selectedModifiers[group.id]?.includes(item.id) && (
                      <MaterialIcons
                        name="check"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    )}
                  <ThemedText style={styles.optionText}>{item.name}</ThemedText>
                  <View style={{ flex: 1 }}></View>
                  <ThemedText style={styles.optionPrice}>
                    {returnPrice(item)}
                  </ThemedText>
                </Pressable>
              )}
            />
          </View>
          {group.type === "multi" && (
            <View style={styles.buttonSection}>
              <ReusableButton
                submit={() => {
                  setShow(false);
                }}
                buttonText="Done"
                buttonStyles={{ width: "50%" }}
              />
            </View>
          )}
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomColor: globalStyles.themeRed.color,
    borderBottomWidth: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  button: {
    backgroundColor: globalStyles.themeRed.color,
    paddingVertical: 10,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
});

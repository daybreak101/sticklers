import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { Category, Item, ModifierGroup } from "@/types/menu";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { getMenuCategories, getModifierGroups } from "@/lib/menuStorage";
import { images } from "@/constants/images";
import { ThemedText } from "@/components/defaults/themed-text";
import { CartItem, NonDefaultModifiers, SelectedModifiers } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import ItemPrice from "@/components/ItemPrice";
import { nanoid } from "nanoid";
import { MaterialIcons } from "@expo/vector-icons";
import ReusableButton from "@/components/defaults/ReusableButton";
import ModifierList2 from "@/components/menu/ModifierList2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function ItemPage({ cartItem }: { cartItem?: CartItem }) {
  const { addItem, showToast } = useCart();

  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifiers>(
    {},
  );

  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  let totalPrice = 0;
  const [item, setItem] = useState<Item | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const { categoryId, itemId } = useLocalSearchParams();
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
  const [specialRequests, setSpecialRequests] = useState(
    cartItem?.specialRequests ?? "",
  );
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  //remove tab navigation for this screen
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: globalStyles.tabBarStyle,
        });
      };
    }, [navigation]),
  );

  //load item and modifiers
  useEffect(() => {
    setLoading(true);
    loadItem();

    const loadGroups = async () => {
      const groups = await getModifierGroups();
      setModifierGroups(groups);
    };
    loadGroups();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 10000);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItem = async () => {
    const categories = await getMenuCategories();
    const found = categories.find((c) => c.id === categoryId) || null;
    setCategory(found || null);
    const item = found?.items.find((i) => i.itemId === itemId) || null;
    setItem(item || null);

    if (item) {
      const defaults = item.defaults;
      if (cartItem) {
        setSelectedModifiers(cartItem.selectedModifiers);
      } else if (defaults) {
        setSelectedModifiers(defaults);
      }
    }
  };

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
        if (groupData?.priceType === "define") {
          newBase = item.pricingRules[groupId][optionId] ?? item.basePrice ?? 0;
          return;
        } else if (groupData?.priceType === "override") {
          newBase = option.price ?? item.basePrice ?? 0;
          return;
        }
        //else, if option is not included in defaults, add it's price to total.
        else if (!item.defaults[groupId].includes(optionId)) {
          modifierPrice += option.price ?? 0;
        }
      });

      if (item.pricingRules && item.pricingRules[groupId]) {
        let overrage =
          selectedOptionIds.length - item.pricingRules[groupId].includedCount;
        //special case, keep for now
        if (selectedOptionIds.includes("boiled_eggs")) {
          overrage--;
        }
        if (overrage > 0) {
          modifierPrice += item.pricingRules[groupId].extraItemPrice * overrage;
        }
      }
    }

    return newBase + modifierPrice; //* quantity;
  }, [item, modifierGroups, selectedModifiers]);

  const totalPriceWithQuantity = useMemo(() => {
    return totalPrice * quantity;
  }, [quantity, totalPrice]);

  // add to cart, called by "Add to Cart" button
  const addToCart = async () => {
    if (!item || !category || loading) return;

    //base price could be defined by price in pricing rules.
    //find it.
    let basePrice = item.basePrice;
    if (!basePrice && item.pricingRules) {
      for (const groupId in item.pricingRules) {
        const group = modifierGroups.find((g) => g.id === groupId);
        if (group && group.priceType === "define") {
          const option = group.options.find(
            (o) => o.id === item.defaults[groupId][0],
          );
          if (option) {
            basePrice = item.pricingRules[groupId][option.id];
          }
        }
      }
    }

    const nonDefaultModifiers: NonDefaultModifiers = {};

    for (const groupId in selectedModifiers) {
      nonDefaultModifiers[groupId] = [];
      const groupData = modifierGroups.find((g) => g.id === groupId);
      const selectedOptionIds = selectedModifiers[groupId];

      if (!groupData) continue;
      nonDefaultModifiers[groupData.name] = [];
      selectedOptionIds.forEach((optionId) => {
        //default selections dont need to be highlighted
        //if (item.defaults[groupId].includes(optionId)) return;

        const option = groupData?.options.find((o) => o.id === optionId);
        if (!option) return;

        if (groupData?.priceType === "define") {
          nonDefaultModifiers[groupData.name].push({
            option: option.name,
            price: item.pricingRules[groupId][optionId] ?? item.basePrice ?? 0,
          });
          return;
        } else if (groupData?.priceType === "override") {
          basePrice = option.price;
          nonDefaultModifiers[groupData.name].push({
            option: option.name,
            price: option.price ?? item.basePrice ?? 0,
          });
          return;
        }
      });
      if (groupData?.priceType !== "add") continue;

      //IDEAS: before for loop, check if default is included in the list.
      // Make a copy of the list and remove the default from it if it exists.
      // Increase the count if it exists.
      // Use the copy in the for loop so that way default is disregarded.

      // also filter out boiled eggs as well, but don't increase the count.

      // remember to push items that is not an overrage
      // to nonDefaultModifiers if it isn't a default, with a price of 0.

      let count = 0;
      let copy = [...selectedOptionIds];
      //filter out boiled eggs
      if (copy.includes("boiled_eggs")) {
        nonDefaultModifiers[groupData.name].push({
          option: "Boiled Eggs",
          price:
            groupData?.options.find((option) => option.id === "boiled_eggs")
              ?.price ?? 0,
        });
        copy = copy.filter((optionId) => optionId !== "boiled_eggs");
      }
      //filter out defaults
      for (let i = 0; i < item.defaults[groupId].length; i++) {
        const defaultId = item.defaults[groupId][i];
        const current = groupData?.options.find(
          (o) => o.id === item.defaults[groupId][i],
        );
        if (!current) continue;
        if (copy.includes(defaultId)) {
          copy = copy.filter((optionId) => optionId !== defaultId);
          count++;
          if (groupData.type === "single") {
            nonDefaultModifiers[groupData.name].push({
              option: current?.name,
              price: 0,
            });
          }
        } else if (groupData.type === "multi") {
          nonDefaultModifiers[groupData.name].push({
            option: "No " + current?.name,
            price: 0,
          });
        }
      }

      // charge for all overrages
      for (let i = 0; i < copy.length; i++) {
        //console.log("copy[i]:", copy[i]);
        const optionId = copy[i];
        const option = groupData?.options.find((o) => o.id === optionId);
        if (!option || option.id === "boiled_eggs") continue;

        count++;
        //console.log("pushing optionId:", optionId);

        if (
          groupData?.priceType === "add" &&
          item.pricingRules[groupId] &&
          count > item.pricingRules[groupId].includedCount
        ) {
          nonDefaultModifiers[groupData.name].push({
            option: option.name,
            price: item.pricingRules[groupId].extraItemPrice ?? 0,
          });
        } else {
          nonDefaultModifiers[groupData.name].push({
            option: option.name,
            price: option.price ?? 0,
          });
        }
      }
    }
    console.log("defaults:", item.defaults);
    console.log("selectedModifiers:", selectedModifiers);
    console.log("nonDefaultModifiers:", nonDefaultModifiers);

    addItem({
      cartItemId: nanoid(),
      categoryId: category?.id,
      itemId: item?.itemId,
      name: item?.name,
      image: item.image ?? category?.image,
      category: category?.name,
      basePrice: basePrice,
      modifierGroupIds: item.modifierGroupIds,
      defaults: item.defaults,
      selectedModifiers: selectedModifiers,
      nonDefaultModifiers: nonDefaultModifiers,
      quantity: quantity,
      finalPrice: totalPrice,
      specialRequests: specialRequests,
      isAvailable: true,
    } as CartItem);
    showToast("Item added to cart");
    navigation.goBack();
  };

  //dont render if item is not loaded
  if (!item) return null;

  const imageKey: string | undefined | null = item.image ?? category?.image;

  return (
    <>
      <Stack.Screen options={{ title: item.name }} />
      <SafeAreaView style={globalStyles.safeArea}>
        <ThemedView
          style={[
            globalStyles.page,
            {
              position: "relative",
              justifyContent: "space-between",
              paddingBottom: 10,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color="white"
              style={styles.mainLoad}
            />
          ) : (
            <Animated.ScrollView
              keyboardShouldPersistTaps="handled"
              // layout={LinearTransition.delay(300).duration(300)}
            >
              <ImageBackground
                source={images[imageKey ?? "logo"]}
                style={styles.image}
                resizeMode="cover"
              ></ImageBackground>
              <ThemedText style={styles.description}>
                {item.description}
              </ThemedText>
              {item.basePrice && (
                <Text style={styles.price}>${item.basePrice?.toFixed(2)}</Text>
              )}
              <ModifierList2
                selectedModifiers={selectedModifiers ?? {}}
                item={item}
                setSelectedModifiers={setSelectedModifiers}
              />
              <Animated.View
                layout={LinearTransition.duration(300)}
              >
                <View style={styles.headerBanner}>
                  <ThemedText style={styles.headerText}>
                    Special Requests
                  </ThemedText>
                </View>
                <KeyboardAvoidingView style={styles.specialRequests}>
                  <TextInput
                    style={[
                      styles.specialRequestsInput,
                      specialRequests.length === 0 && { fontStyle: "italic" },
                    ]}
                    placeholder="lightly toasted, cold meat, cold cheese, etc."
                    placeholderTextColor={"gray"}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setSpecialRequests(text)}
                  />
                </KeyboardAvoidingView>
              </Animated.View>
            </Animated.ScrollView>
          )}
          <View style={styles.bottomBar}>
            <ItemPrice totalPrice={totalPriceWithQuantity} />
            <View style={styles.bottomBarBottom}>
              <View
                style={[
                  styles.buttonContainer,
                  { flexDirection: "row", gap: 10 },
                ]}
              >
                <Pressable
                  onPress={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                  style={styles.button}
                >
                  <MaterialIcons name="remove" size={20} color="white" />
                </Pressable>
                <Text style={[styles.buttonText, { width: 30 }]}>
                  {quantity}
                </Text>
                <Pressable
                  onPress={() => {
                    if (quantity < 99) setQuantity(quantity + 1);
                  }}
                  style={styles.button}
                >
                  <MaterialIcons name="add" size={20} color="white" />
                </Pressable>
              </View>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={styles.rightButtonContainer}
                />
              ) : (
                <ReusableButton
                  submit={addToCart}
                  buttonText={cartItem ? "Update Item" : "Add to Cart"}
                  buttonStyles={styles.rightButtonContainer}
                  textStyles={styles.buttonText}
                />
              )}
            </View>
          </View>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  mainLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
  title: {
    paddingTop: 20,
    textAlign: "center",
  },
  description: {
    padding: 20,
    textAlign: "center",
    fontWeight: 200,
    fontSize: 14,
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "rgb(232, 70, 70)",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 300,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "rgb(232, 70, 70)",
    padding: 10,
    borderRadius: 10,
  },
  rightButtonContainer: {
    flex: 1,
    backgroundColor: "rgb(232, 70, 70)",
    padding: 10,
    borderRadius: 10,
  },
  bottomBar: {
    borderTopColor: "rgb(249, 249, 249)",
    borderTopWidth: 0.2,
  },
  bottomBarTop: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomBarBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
  },
  totalText: { fontSize: 20, textAlign: "center", paddingLeft: 10 },
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
  specialRequestsInput: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    color: "white",
    textAlignVertical: "top",
    justifyContent: "flex-start",
  },
  specialRequests: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    borderRadius: 10,
  },
});

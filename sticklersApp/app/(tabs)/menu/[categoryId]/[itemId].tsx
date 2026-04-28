import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/defaults/themed-view";
import { globalStyles } from "@/styles/global";
import { Category, Item, ModifierGroup } from "@/types/menu";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { getMenuCategories, getModifierGroups } from "@/lib/menuStorage";
import { images } from "@/constants/images";
import { ThemedText } from "@/components/defaults/themed-text";
import ModifiersList from "@/components/ModifiersList";
import { CartItem, SelectedModifiers } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import ItemPrice from "@/components/ItemPrice";

export default function ItemPage() {
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifiers>(
    {},
  );

  const [quantity, setQuantity] = useState(1);
  let totalPrice = 0;
  const [item, setItem] = useState<Item | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const { categoryId, itemId } = useLocalSearchParams();
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);

  const navigation = useNavigation();
  const { cart, addItem, removeItem, clearCart } = useCart();

  //remove tab navigation for this screen
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      };
    }, [navigation]),
  );

  //load item and modifiers
  useEffect(() => {
    loadItem();

    const loadGroups = async () => {
      const groups = await getModifierGroups();
      setModifierGroups(groups);
    };
    loadGroups();
  }, []);

  const loadItem = async () => {
    const categories = await getMenuCategories();
    const found = categories.find((c) => c.id === categoryId) || null;
    setCategory(found || null);
    const item = found?.items.find((i) => i.itemId === itemId) || null;
    setItem(item || null);

    if (item) {
      const defaults = item.defaults;
      if (defaults) {
        setSelectedModifiers(defaults);
      }
    }
  };

  // add to cart, called by "Add to Cart" button
  const addToCart = async () => {
    if (!item || !category) return;
    addItem({
      itemId: item?.itemId,
      name: item?.name,
      image: item.image ?? category?.image,
      category: category?.name,
      basePrice: item.basePrice,
      modifierGroupIds: item.modifierGroupIds,
      defaults: item.defaults,
      selectedModifiers: selectedModifiers,
      quantity: quantity,
      finalPrice: totalPrice,
      specialRequests: "",
    } as CartItem);
  };

  //dont render if item is not loaded
  if (!item) return null;

  const imageKey: string | undefined | null = item.image ?? category?.image;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ThemedView
        style={[
          globalStyles.page,
          { position: "relative", justifyContent: "space-between" },
        ]}
      >
        <ScrollView>
          <ImageBackground
            source={images[imageKey ?? "logo"]}
            style={styles.image}
            resizeMode="cover"
          ></ImageBackground>
          <ThemedText style={[globalStyles.title, styles.title]}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
          {item.basePrice && <Text style={styles.price}>${item.basePrice?.toFixed(2)}</Text>}
          <ModifiersList
            selectedModifiers={selectedModifiers ?? {}}
            item={item}
            setSelectedModifiers={setSelectedModifiers}
          />
        </ScrollView>

        <View style={styles.bottomBar}>
          <ItemPrice item={item} modifierGroups={modifierGroups} selectedModifiers={selectedModifiers} quantity={quantity} totalPrice={totalPrice} />
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
                <Text style={styles.buttonText}>-</Text>
              </Pressable>
              <Text style={[styles.buttonText, { width: 30 }]}>{quantity}</Text>
              <Pressable
                onPress={() => {
                  if (quantity < 99) setQuantity(quantity + 1);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={addToCart} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
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
  },
  totalText: { fontSize: 20, textAlign: "center", paddingLeft: 10 },
});

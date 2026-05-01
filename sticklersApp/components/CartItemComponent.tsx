import { ImageBackground, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CartItem } from "@/types/cart";
import { images } from "@/constants/images";
import { ThemedText } from "./defaults/themed-text";
import ItemModifiersInCart from "./ItemModifiersInCart";

type CartItemProps = {
  cartItem: CartItem;
};

export default function CartItemComponent({ cartItem }: CartItemProps) {
  const imageKey: string | undefined | null = cartItem.image;

  return (
    <View>
      <ImageBackground
        source={images[imageKey ?? "logo"]}
        style={styles.image}
        resizeMode="contain"
      ></ImageBackground>
      <View>
        {/* <ThemedText>{cartItem.cartItemId}</ThemedText> */}
        <ThemedText style={styles.itemName}>{cartItem.name}</ThemedText>
        <ThemedText style={styles.price}>${cartItem.basePrice.toFixed(2)}</ThemedText>
      </View>
      <FlatList 
        data={Object.entries(cartItem.nonDefaultModifiers)}
        keyExtractor={(item) => item[0]}
        style={styles.modifierList}
        renderItem={({ item }) => {
          return <ItemModifiersInCart item={item} />
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 100,
  },
  itemName: {},
  price: {

  },
  modifierList: {

  }
});

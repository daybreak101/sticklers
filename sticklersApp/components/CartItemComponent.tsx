import { ImageBackground, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CartItem } from "@/types/cart";
import { images } from "@/constants/images";
import { ThemedText } from "./defaults/themed-text";

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
        resizeMode="cover"
      ></ImageBackground>
      <View>
        <ThemedText>{cartItem.name}</ThemedText>
        <ThemedText>${cartItem.basePrice.toFixed(2)}</ThemedText>
      </View>
      <FlatList 
        data={Object.entries(cartItem.selectedModifiers)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const [groupId, optionIds] = item;
          return (
            <ThemedText>{groupId}: {optionIds.join(", ")}</ThemedText>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

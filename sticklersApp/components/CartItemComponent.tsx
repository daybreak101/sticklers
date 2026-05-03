import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { CartItem } from "@/types/cart";
import { images } from "@/constants/images";
import { ThemedText } from "./defaults/themed-text";
import ItemModifiersInCart from "./ItemModifiersInCart";
import { useCart } from "@/context/CartContext";

type CartItemProps = {
  cartItem: CartItem;
};

export default function CartItemComponent({ cartItem }: CartItemProps) {
  const imageKey: string | undefined | null = cartItem.image;
  const { updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images[imageKey ?? "logo"]}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>
      <View style={styles.info}>
        {/* <ThemedText>{cartItem.cartItemId}</ThemedText> */}
        <ThemedText style={styles.itemName}>{cartItem.name}</ThemedText>
        <FlatList
          data={Object.entries(cartItem.nonDefaultModifiers)}
          keyExtractor={(item) => item[0]}
          style={styles.modifierList}
          renderItem={({ item }) => {
            return <ItemModifiersInCart item={item} />;
          }}
        />
        {cartItem.specialRequests && cartItem.specialRequests?.length > 0 && (
          <ThemedText style={styles.specialRequests}>
            &quot;{cartItem.specialRequests}&quot;
          </ThemedText>
        )}
        <View style={styles.bottomBar}>
          <Pressable
            onPress={() => {
              if (cartItem.quantity > 1) updateQuantity(cartItem.itemId, -1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Text style={[styles.buttonText, { width: 30 }]}>{cartItem.quantity}</Text>
          <Pressable
            onPress={() => {
              if (cartItem.quantity < 99) updateQuantity(cartItem.itemId, 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <ThemedText style={styles.price}>
            ${(cartItem.finalPrice * cartItem.quantity).toFixed(2)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "rgb(74, 74, 74)",
    width: "100%",
    padding: 10,
  },
  info: {
    flex: 2.5,
  },
  imageContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  image: {
    width: "80%",
    height: 80,
    borderRadius: 40, //TODO: make this dynamic
  },
  itemName: {
    paddingTop: 5,
    fontSize: 18,
    fontWeight: 900,
  },
  price: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: 900,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  modifierList: {
    paddingBottom: 10,
  },
  specialRequests: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(104, 33, 29)",
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
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
});

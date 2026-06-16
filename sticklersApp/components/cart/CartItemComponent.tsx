import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { images } from "@/constants/images";
import { ThemedText } from "@/components/defaults/themed-text";
import ItemModifiersInCart from "./ItemModifiersInCart";
import { useCart } from "@/context/CartContext";
import { globalStyles } from "@/styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AreYouSure from "./AreYouSure";

type CartItemProps = {
  cartItem: CartItem;
};

export default function CartItemComponent({ cartItem }: CartItemProps) {
  const imageKey: string | undefined | null = cartItem.image;
  const { updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(cartItem.isAvailable);

  const removeItemFromCart = async () => {
    await removeItem(cartItem.cartItemId);
    setShow(false);
  };

  useEffect(() => {
    setIsDisabled(!cartItem.isAvailable);
  }, [cartItem.isAvailable]);

  return (
    <View style={styles.container}>
      <AreYouSure
        show={show}
        setShow={setShow}
        title={"Remove Item"}
        onAccept={removeItemFromCart}
        acceptText="Yes"
        rejectText="No"
        message={`Are you sure you want to remove ${cartItem.name} from your cart?`}
      />
      <View style={styles.mainContent}>
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
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              if (cartItem.quantity > 1)
                updateQuantity(cartItem.cartItemId, -1);
            }}
            style={styles.button}
          >
            <MaterialIcons name="remove" size={20} color="white" />
          </Pressable>
          <Text style={[styles.buttonText, { width: 40 }]}>
            {cartItem.quantity}
          </Text>
          <Pressable
            onPress={() => {
              if (cartItem.quantity < 99)
                updateQuantity(cartItem.cartItemId, 1);
            }}
            style={styles.button}
          >
            <MaterialIcons name="add" size={20} color="white" />
          </Pressable>
        </View>
        <View style={styles.interactions}>
          <Pressable
            onPress={() => {
              setShow(true);
              // removeItem(cartItem.cartItemId);
            }}
            style={styles.buttonInteraction}
          >
            <MaterialIcons name="delete-outline" size={20} color="white" />
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/cart/edit/[cartItemId]",
                params: {
                  cartItemId: cartItem.cartItemId,
                },
              })
            }
            style={styles.buttonInteraction}
          >
            <MaterialIcons name="edit" size={20} color="white" />
          </Pressable>
        </View>
        <ThemedText style={styles.price}>
          ${(cartItem.finalPrice * cartItem.quantity).toFixed(2)}
        </ThemedText>
      </View>
      {isDisabled && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ color: "white", width: "50%", textAlign: "center" }}
          >
            Not Available
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgb(74, 74, 74)",
    width: "100%",
    padding: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    // backgroundColor: "rgb(232, 70, 70)",
    textAlign: "right",
    verticalAlign: "middle",
    fontSize: 18,
    fontWeight: 900,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 80,
    height: "100%",
  },
  modifierList: {
    paddingBottom: 10,
  },
  specialRequests: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(104, 33, 29)",
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: globalStyles.themeRedBright.color,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.34)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInteraction: {
    // backgroundColor: "rgba(0, 0, 0, 0.34)",
    backgroundColor: globalStyles.themeBlack.color,
    width: 32,
    height: 32,
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
  interactions: {
    // backgroundColor: "rgb(70, 86, 232)",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
});

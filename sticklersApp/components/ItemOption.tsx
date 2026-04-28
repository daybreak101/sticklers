import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Category, Item } from "@/types/menu";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function ItemOption({
  item,
  category,
}: {
  item: Item;
  category: Category;
}) {
  const router = useRouter();
  const imageKey: string | undefined = item.image ?? category.image;
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/menu/[categoryId]/[itemId]",
          params: {
            categoryId: category.id,
            itemId: item.itemId,
          },
        })
      }
    >
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={images[imageKey ?? "logo"]}
          style={styles.image}
          resizeMode="cover"
        ></ImageBackground>
        <View style={styles.textBackground}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
            {item.basePrice && <Text style={styles.price}>${item.basePrice.toFixed(2)}</Text>}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    overflow: "hidden",
    height: 200,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 100,
  },
  textBackground: {
    paddingVertical: 10,
    borderBottomEndRadius: 10,
    backgroundColor: "rgb(74, 74, 74)",
    width: "100%",
    height: "49%",
  },
  textContainer: {
    margin: "auto"
  },
  text: {
    
    color: "white",
    fontSize: 15,
    fontWeight: 900,
    textAlign: "center",
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  price: {
    color: "white",
    textAlign: "center",
  },
});

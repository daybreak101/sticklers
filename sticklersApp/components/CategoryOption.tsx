import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Category } from "@/types/menu";
import { ThemedText } from "./defaults/themed-text";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function CategoryOption({ category }: { category: Category }) {
  const router = useRouter();
  const imageKey: string | undefined = category.image;

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/menu/[categoryId]",
          params: { categoryId: category.id },
        })
      }
    >
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={images[imageKey ?? "logo"]}
          style={styles.image}
        >
          <View style={styles.textBackground}>
            <Text style={styles.text}>{category.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
  },
  textBackground: {
    marginBottom: 10,
    marginTop: "auto",
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  text: {
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: 900,
  },
});

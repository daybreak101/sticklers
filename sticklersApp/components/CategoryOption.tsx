import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Category } from "@/types/menu";
import { ThemedText } from "./defaults/themed-text";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { useHours } from "@/context/HoursContext";
import { formatBusinessTime } from "@/lib/formatTime";
import useCurrentMinute from "@/hooks/useCurrentMinute";

export default function CategoryOption({ category }: { category: Category }) {
  const router = useRouter();
  const imageKey: string | undefined = category.image;

  const { scheduledTime, setScheduledTime } = useHours();
  const [isDisabled, setIsDisabled] = useState(false);

  const startTime = formatBusinessTime(
    category.availability?.startTime ?? null,
  );
  const endTime = formatBusinessTime(category.availability?.endTime ?? null);

  const currentMinute = useCurrentMinute();

  useEffect(() => {
    console.log("checking availability");
    if (!category.availability) {
      return;
    }

    let now = new Date();
    if (scheduledTime) {
      now = scheduledTime;
    }

    //const now = new Date(2000, 0, 1, 10, 1, 0);
    let time = now.getHours() * 100 + now.getMinutes();
    console.log(time, category.availability.startTime, category.availability.endTime);
    if (
      category.availability.startTime > time ||
      category.availability.endTime <= time
    ) {
      setIsDisabled(true);
    }
    else {
      setIsDisabled(false);
    }
  }, [category, scheduledTime, currentMinute]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/menu/[categoryId]",
          params: { categoryId: category.id },
        })
      }
      disabled={isDisabled}
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
            Only available between {startTime} and {endTime}
          </ThemedText>
        </View>
      )}
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

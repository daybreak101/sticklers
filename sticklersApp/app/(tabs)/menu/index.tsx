import ParallaxScrollView from "@/components/defaults/parallax-scroll-view";
import { ThemedText } from "@/components/defaults/themed-text";
import { ThemedView } from "@/components/defaults/themed-view";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/global";
import { getHours, getMenuCategories } from "@/lib/menuStorage";
import { Category } from "@/types/menu";
import CategoryOption from "@/components/CategoryOption";
import ScheduleOrder from "@/components/cart/ScheduleOrder";
import { useHours } from "@/context/HoursContext";
import ScheduleModal from "@/components/menu/ScheduleModal";

export default function HomeScreen() {
  const [data, setData] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(true);

  const { hours, setHours } = useHours();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getMenuCategories();
    const hours = await getHours();
    console.log(hours);
    setData(result);
    setHours(hours);
  };

  return (
    <ThemedView style={globalStyles.page}>
      <ScheduleModal
        show={modalVisible}
        setShow={setModalVisible}
      />
      <ScheduleOrder />
      <ThemedText style={[globalStyles.title, { padding: 10 }]}>
        CATEGORIES
      </ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryOption category={item} />}
        ItemSeparatorComponent={() => <View style={{ padding: 10 }}></View>}
        ListFooterComponent={() => <View style={{ padding: 10 }}></View>}
      />
    </ThemedView>
  );
}

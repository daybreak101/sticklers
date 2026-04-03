import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Menu() {
  return (
    <View>
      <Text>Menu</Text>
      <Link href="/menu/123">Go to Item 123</Link>
    </View>
  );
}
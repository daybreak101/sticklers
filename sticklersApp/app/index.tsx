import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import ModalScreen from "./modal";
import { useTheme } from "@react-navigation/native";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Home</Text>
      <Link style={{ color: colors.primary }} href="/modal">
        Go to Modal
      </Link>
      <Link style={{ color: colors.primary }} href="/menu">
        Go to Menu
      </Link>
    </View>
  );
}

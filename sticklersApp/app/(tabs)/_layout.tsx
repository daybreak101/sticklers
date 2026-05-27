import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "@/styles/global";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="menu"
      screenOptions={{
        headerShown: false,
        tabBarStyle: globalStyles.tabBarStyle,
        tabBarActiveTintColor: globalStyles.themeYellow.color,
        tabBarInactiveTintColor: globalStyles.themeRedBright.color,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIconStyle: { width: 30, height: 30 },
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
          popToTopOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          popToTopOnBlur: true,
        }}
      />
    </Tabs>
  );
}

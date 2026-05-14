import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        
        animation: "shift",

        tabBarStyle: {
          height: 82,

          backgroundColor: "#fff",

          borderTopWidth: 0,

          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 14,

          fontWeight: "700",

          marginBottom: 8,
        },

        tabBarActiveTintColor: "#000",

        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="bar-chart"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
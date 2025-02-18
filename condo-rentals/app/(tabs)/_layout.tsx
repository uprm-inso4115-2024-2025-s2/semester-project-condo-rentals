import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import React from "react";

const Layout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen
          name="Listings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="Map"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      {/* Search Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Search text"
        placeholderTextColor="#A0A0A0"
      />
      
      {/* Search Icon */}
      <Ionicons name="search-outline" size={20} color="black" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ListingDetailsProps {
  landlordName: string;
  condoAssetsAndPrice: string;
  imageUrl?: string;
  onClose: () => void;
}

const RentalListingDetailsCard: React.FC<ListingDetailsProps> = ({ landlordName, condoAssetsAndPrice, imageUrl, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* Condo Details Header */}
        <Text style={styles.header}>Condo Details</Text>
        <Text style={styles.subHeader}>Lipsum dolor sit amet, consectetur adipiscing elit</Text>

        {/* Property Image */}
        <Image
          source={imageUrl ? { uri: imageUrl } : require("../assets/images/Condo Rental Assets/Condo_ListingPlaceholder.png")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Landlord Name */}
        <Text style={styles.label}>Landlord name</Text>
        <TextInput
          style={styles.input}
          value={landlordName}
          editable={false}
          placeholder="Enter landlord name"
          placeholderTextColor="#A0A0A0"
        />

        {/* Condo Assets and Price */}
        <Text style={styles.label}>Condo assets and price</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={condoAssetsAndPrice}
          editable={false}
          multiline
          placeholder="Enter condo details"
          placeholderTextColor="#A0A0A0"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.92,
    height: height * 0.78,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  subHeader: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: height * 0.35,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#F8F8F8",
    color: "#808080",
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default RentalListingDetailsCard;
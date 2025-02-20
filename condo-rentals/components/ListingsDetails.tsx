import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ListingDetailsProps {
  landlordName: string;
  landlordDescription: string;
  location: string;
  condoFeatures: string;
  price: string;
  imageUrl?: string;
  onClose: () => void;
}

const RentalListingDetailsCard: React.FC<ListingDetailsProps> = ({
  landlordName,
  landlordDescription,
  location,
  condoFeatures,
  price,
  imageUrl,
  onClose,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* Listing Details Header */}
        <Text style={styles.header}>Listing Details</Text>
        <Text style={styles.subHeader}>{location}</Text>

        {/* Property Image */}
        <Image
          source={imageUrl ? { uri: imageUrl } : require("../assets/images/Condo Rental Assets/Condo_ListingPlaceholder.png")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Landlord Name & Description */}
        <Text style={styles.label}>{landlordName}</Text>
        <TextInput
          style={styles.input}
          value={landlordDescription}
          editable={false}
        />

        {/* Condo Features & Price */}
        <Text style={styles.label}>Assets and Price</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={`Features: ${condoFeatures}\nPrice: ${price}`}
          editable={false}
          multiline
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
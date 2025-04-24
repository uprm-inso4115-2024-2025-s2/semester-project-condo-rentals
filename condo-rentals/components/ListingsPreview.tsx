import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface ListingPreviewProps {
  imageUrl?: string;
  landlordName: string;
  priceLocation: string;
  onPress: () => void;
}

const RentalListingPreviewCard: React.FC<ListingPreviewProps> = ({
  imageUrl,
  landlordName,
  priceLocation,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Property Image */}
      <Image
        source={imageUrl ? { uri: imageUrl } : require("../assets/images/Condo Rental Assets/Condo_ListingPlaceholder.png")}
        style={styles.image}
      />

      {/* Landlord Name */}
      <Text style={styles.landlordName}>{landlordName}</Text>

      {/* Price & Location */}
      <View style={styles.infoContainer}>
        <Text style={styles.priceLocation}>{priceLocation}</Text>
      </View>

      {/* See More Button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    width: 180,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  image: {
    width: 140,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  landlordName: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
    color: "#0D47A1",
  },
  infoContainer: {
    backgroundColor: "#E3F2FD",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 6,
    width: "100%",
    alignItems: "center",
  },
  
  priceLocation: {
    fontSize: 13,
    color: "#000",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1565C0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default RentalListingPreviewCard;
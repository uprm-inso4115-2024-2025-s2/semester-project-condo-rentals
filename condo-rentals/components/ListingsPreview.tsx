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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: 160,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  landlordName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 4,
    width: "100%",
    alignItems: "center",
  },
  priceLocation: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#337137",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default RentalListingPreviewCard;
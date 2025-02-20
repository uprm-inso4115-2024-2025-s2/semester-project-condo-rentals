import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import RentalListingCard from "../../components/ListingsPreview";
import CondoDetails from "../../components/ListingsDetails";

const Listings = () => {
  // First listing to populate CondoDetails
  const firstListing = {
    landlordName: "John Doe",
    landlordDescription: "Experienced landlord, great service!",
    location: "Pueblo Mayagüez",
    condoFeatures: "2 Beds, 1 Bath, Kitchen, WiFi",
    price: "$400 per month",
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {/* Render Only One Listing Card */}
          <RentalListingCard
            landlordName={firstListing.landlordName}
            priceLocation={`$400 - Pueblo Mayagüez`}
            onPress={() => {}}
          />
        </View>

        {/* CondoDetails Component Now Reflects First Listing */}
        <View style={styles.detailsContainer}>
          <CondoDetails
            landlordName={firstListing.landlordName}
            landlordDescription={firstListing.landlordDescription}
            location={firstListing.location}
            condoFeatures={firstListing.condoFeatures}
            price={firstListing.price}
            onClose={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingBottom: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
});

export default Listings;
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import RentalListingCard from "../../components/ListingsPreview";
import CondoDetails from "../../components/ListingsDetails";

const Listings = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {/* Render Rental Listing Cards */}
          {[
            { landlordName: "John Doe", priceLocation: "$400 - Pueblo Mayagüez" },
            // { landlordName: "Ana López", priceLocation: "$950 - Condominio El Escorial" },
            // { landlordName: "Carlos Rivera", priceLocation: "$500 - Condominio Alturas de Mayagüez" },
            // { landlordName: "Roberto Torres", priceLocation: "$500 - Mayagüez Terrace" },
          ].map((listing, index) => (
            <RentalListingCard
              key={index}
              landlordName={listing.landlordName}
              priceLocation={listing.priceLocation}
              onPress={() => {}} // See More button does nothing for now
            />
          ))}
        </View>

        {/* CondoDetails Component is always shown below the 4 listings */}
        <View style={styles.detailsContainer}>
          <CondoDetails
            landlordName="Lorem Ipsum"
            condoAssetsAndPrice="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            // imageUrl="../assets/images/Condo Rental Assets/Condo_ListingPlaceholder.png"
            onClose={() => {}} // Close button does nothing for now
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
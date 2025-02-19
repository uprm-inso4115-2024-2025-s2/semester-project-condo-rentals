import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import RentalListingPreviewCard from "../../components/ListingsPreview";

const Listings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <RentalListingPreviewCard
          landlordName="John Doe"
          priceLocation="$400 - Pueblo Mayagüez"
          onPress={() => console.log("Navigating to details")}
        />
        {/* <RentalListingCard
          landlordName="Ana López"
          priceLocation="$950 - Condominio El Escorial"
          onPress={() => console.log("Navigating to details")}
        />
        <RentalListingCard
          landlordName="Carlos Rivera"
          priceLocation="$500 - Condominio Alturas de Mayagüez"
          onPress={() => console.log("Navigating to details")}
        />
        <RentalListingCard
          landlordName="Roberto Torres"
          priceLocation="$500 - Mayagüez Terrace"
          onPress={() => console.log("Navigating to details")}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default Listings;
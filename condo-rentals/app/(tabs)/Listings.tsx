import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Modal, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RentalListingCard from "../../components/ListingsPreview";
import CondoDetails from "../../components/ListingsDetails";

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState<{
    landlordName: string;
    landlordDescription: string;
    location: string;
    condoFeatures: string;
    price: string;
    imageUrl?: string;
  } | null>(null);
  
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const listings = [
    {
      landlordName: "John Doe",
      landlordDescription: "Friendly landlord, perfect for students.",
      location: "Pueblo Mayagüez",
      condoFeatures: "2 Beds, 1 Bath, WiFi, Fully Furnished",
      price: "$400 per month",
    },
    {
      landlordName: "Ana López",
      landlordDescription: "Quiet space, ideal for studying.",
      location: "Condominio El Escorial",
      condoFeatures: "1 Bed, 1 Bath, Study Desk, WiFi",
      price: "$450 per month",
    },
    {
      landlordName: "Carlos Rivera",
      landlordDescription: "Close to UPRM, utilities included.",
      location: "Alturas de Mayagüez",
      condoFeatures: "1 Bed, 1 Bath, AC, Internet, Parking",
      price: "$500 per month",
    },
    {
      landlordName: "Roberto Torres",
      landlordDescription: "Spacious apartment, perfect for roommates.",
      location: "Mayagüez Terrace",
      condoFeatures: "2 Beds, 1 Bath, Shared Kitchen, Study Lounge",
      price: "$550 per month",
    },
    {
      landlordName: "Isabel Martínez",
      landlordDescription: "Cozy apartment with study-friendly environment.",
      location: "Dulces Labios",
      condoFeatures: "1 Bed, 1 Bath, Private Balcony, WiFi",
      price: "$470 per month",
    },
    {
      landlordName: "Miguel Santiago",
      landlordDescription: "Affordable rent, close to supermarkets and transport.",
      location: "Mayagüez Terrace",
      condoFeatures: "1 Bed, 1 Bath, Shared Laundry, AC",
      price: "$430 per month",
    },
    {
      landlordName: "Laura Hernández",
      landlordDescription: "Safe neighborhood, walking distance from UPRM.",
      location: "Mayagüez Terrace",
      condoFeatures: "2 Beds, 1 Bath, Gated Community, Parking",
      price: "$520 per month",
    },
    {
      landlordName: "Pedro Gómez",
      landlordDescription: "Affordable student housing with all essentials included.",
      location: "Pueblo Mayagüez",
      condoFeatures: "1 Bed, 1 Bath, WiFi, Mini-Fridge, Study Desk",
      price: "$410 per month",
    },
  ];

  const filteredListings = listings.filter(
    (listing) =>
      listing.landlordName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.condoFeatures.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = () => {
    setSearchQuery(searchText);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar and Icon */}
      <View style={styles.searchContainer}>
        {isSearchVisible ? (
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search listings..."
              placeholderTextColor="#A0A0A0"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={() => { setSearchText(""); setSearchQuery(""); setIsSearchVisible(false); }}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsSearchVisible(true)} style={styles.searchIcon}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Listings Grid */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {filteredListings.map((listing, index) => (
            <RentalListingCard
              key={index}
              landlordName={listing.landlordName}
              priceLocation={`${listing.price} - ${listing.location}`}
              onPress={() => setSelectedListing(listing)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal for Condo Details - Shows Only When a Listing is Selected */}
      <Modal 
        visible={!!selectedListing} 
        transparent 
        animationType="slide"
        onRequestClose={() => setSelectedListing(null)}
      >
        {selectedListing && (
          <CondoDetails
            landlordName={selectedListing.landlordName}
            landlordDescription={selectedListing.landlordDescription}
            location={selectedListing.location}
            condoFeatures={selectedListing.condoFeatures}
            price={selectedListing.price}
            imageUrl={selectedListing.imageUrl}
            onClose={() => setSelectedListing(null)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 30,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
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
});

export default Listings;

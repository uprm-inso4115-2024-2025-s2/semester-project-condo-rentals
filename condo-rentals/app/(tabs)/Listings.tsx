import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Modal, TextInput, TouchableOpacity, Keyboard, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RentalListingCard from "../../components/ListingsPreview";
import CondoDetails from "../../components/ListingsDetails";

interface Listing {
  landlordName: string;
  landlordDescription: string;
  location: string;
  condoFeatures: string;
  price: string;
  imageUrl?: string;
}

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  const listings: Listing[] = [
    { landlordName: "John Doe", landlordDescription: "Friendly landlord, perfect for students.", location: "Pueblo Mayagüez", condoFeatures: "2 Beds, 1 Bath, WiFi", price: "$400 per month" },
    { landlordName: "Ana López", landlordDescription: "Quiet space, ideal for studying.", location: "Condominio El Escorial", condoFeatures: "1 Bed, 1 Bath, Study Desk", price: "$450 per month" },
    { landlordName: "Carlos Rivera", landlordDescription: "Close to UPRM, utilities included.", location: "Alturas de Mayagüez", condoFeatures: "1 Bed, 1 Bath, AC", price: "$500 per month" },
    { landlordName: "Roberto Torres", landlordDescription: "Spacious apartment, perfect for roommates.", location: "Mayagüez Terrace", condoFeatures: "2 Beds, 1 Bath, Shared Kitchen", price: "$550 per month" },
    { landlordName: "Isabel Martínez", landlordDescription: "Cozy apartment with study-friendly environment.", location: "Dulces Labios", condoFeatures: "1 Bed, 1 Bath, Private Balcony", price: "$470 per month" },
    { landlordName: "Miguel Santiago", landlordDescription: "Affordable rent, close to supermarkets and transport.", location: "Mayagüez Terrace", condoFeatures: "1 Bed, 1 Bath, Shared Laundry", price: "$430 per month" },
    { landlordName: "Laura Hernández", landlordDescription: "Safe neighborhood, walking distance from UPRM.", location: "Mayagüez Terrace", condoFeatures: "2 Beds, 1 Bath, Gated Community", price: "$520 per month" },
    { landlordName: "Pedro Gómez", landlordDescription: "Affordable student housing with all essentials included.", location: "Pueblo Mayagüez", condoFeatures: "1 Bed, 1 Bath, WiFi", price: "$410 per month" },
  ];

  const handleSearchSubmit = () => {
    setSearchQuery(searchText);
    Keyboard.dismiss();
  };

  useEffect(() => {
    let updatedListings = listings.filter(
      (listing) =>
        listing.landlordName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.condoFeatures.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedFilter) {
      updatedListings = [...updatedListings].sort((a, b) => {
        switch (selectedFilter) {
          case "Price: Low to High":
            return parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""));
          case "Price: High to Low":
            return parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, ""));
          case "Landlord Name":
            return a.landlordName.localeCompare(b.landlordName);
          case "Location":
            return a.location.localeCompare(b.location);
          default:
            return 0;
        }
      });
    }

    setFilteredListings(updatedListings);
  }, [searchQuery, selectedFilter]);

  return (
    <View style={styles.container}>
      {/* Top Row: Filter & Search */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsFilterVisible(true)}>
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>

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
          <TouchableOpacity onPress={() => setIsSearchVisible(true)} style={styles.iconButton}>
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

      {/* CondoDetails Modal */}
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

      {/* Filter Modal */}
      <Modal visible={isFilterVisible} transparent animationType="fade">
        <View style={styles.filterOverlay}>
          <View style={styles.filterModal}>
            <Text style={styles.filterTitle}>Filter Listings</Text>
            {["Price: Low to High", "Price: High to Low", "Landlord Name", "Location"].map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.filterOption} 
                onPress={() => {
                  setSelectedFilter(filter);
                  setIsFilterVisible(false);
                }}
              >
                <Ionicons name={selectedFilter === filter ? "radio-button-on" : "radio-button-off"} size={20} color="black" />
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.filterCloseButton} onPress={() => setIsFilterVisible(false)}>
              <Text style={styles.filterCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 8,
  },
  filterCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  filterCloseText: {
    fontSize: 16,
    fontWeight: "bold",
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
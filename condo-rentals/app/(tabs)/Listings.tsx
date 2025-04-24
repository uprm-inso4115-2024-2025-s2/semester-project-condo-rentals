import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Modal } from "react-native";
import RentalListingCard from "../../components/ListingsPreview";
import RentalListingDetailsCard from "../../components/ListingsDetails";

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState<any | null>(null);

  const listings = [
    {
      landlordName: "John Doe",
      landlordDescription: "Friendly landlord, perfect for students.",
      location: "Pueblo Mayagüez",
      condoFeatures: "2 Beds, 1 Bath, WiFi, Fully Furnished",
      price: "$400 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
      "https://source.unsplash.com/featured/?livingroom",
      "https://source.unsplash.com/featured/?bedroom",
    ],
    },
    {
      landlordName: "Ana López",
      landlordDescription: "Quiet space, ideal for studying.",
      location: "Condominio El Escorial",
      condoFeatures: "1 Bed, 1 Bath, Study Desk, WiFi",
      price: "$450 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Carlos Rivera",
      landlordDescription: "Close to UPRM, utilities included.",
      location: "Alturas de Mayagüez",
      condoFeatures: "1 Bed, 1 Bath, AC, Internet, Parking",
      price: "$500 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Roberto Torres",
      landlordDescription: "Spacious apartment, perfect for roommates.",
      location: "Mayagüez Terrace",
      condoFeatures: "2 Beds, 1 Bath, Shared Kitchen, Study Lounge",
      price: "$550 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Isabel Martínez",
      landlordDescription: "Cozy apartment with study-friendly environment.",
      location: "Dulces Labios",
      condoFeatures: "1 Bed, 1 Bath, Private Balcony, WiFi",
      price: "$470 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Miguel Santiago",
      landlordDescription: "Affordable rent, close to supermarkets and transport.",
      location: "Mayagüez Terrace",
      condoFeatures: "1 Bed, 1 Bath, Shared Laundry, AC",
      price: "$430 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Laura Hernández",
      landlordDescription: "Safe neighborhood, walking distance from UPRM.",
      location: "Mayagüez Terrace",
      condoFeatures: "2 Beds, 1 Bath, Gated Community, Parking",
      price: "$520 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
    {
      landlordName: "Pedro Gómez",
      landlordDescription: "Affordable student housing with all essentials included.",
      location: "Pueblo Mayagüez",
      condoFeatures: "1 Bed, 1 Bath, WiFi, Mini-Fridge, Study Desk",
      price: "$410 per month",
      images: ["https://source.unsplash.com/featured/?apartment",
        "https://source.unsplash.com/featured/?livingroom",
        "https://source.unsplash.com/featured/?bedroom",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
        {listings.map((listing, index) => (
          <RentalListingCard
            key={index}
            landlordName={listing.landlordName}
            priceLocation={`${listing.price} - ${listing.location}`}
            imageUrl={listing.images[0]}
            onPress={() => setSelectedListing(listing)}
          />
        ))}
        </View>
      </ScrollView>

      {/* Modal for Listing Details */}
      <Modal visible={!!selectedListing} transparent animationType="slide">
        {selectedListing && (
          <RentalListingDetailsCard
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

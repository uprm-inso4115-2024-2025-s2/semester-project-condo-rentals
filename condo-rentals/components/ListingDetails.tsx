import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface ListingDetailsProps {
  listing: {
    images: string[];
    landlordName: string;
    landlordDescription: string;
    location: string;
    condoFeatures: string;
    price: string;
    onBack: () => void;
  };
}

const ListingDetails = ({ listing }: { listing: ListingDetailsProps["listing"] }) => {
  if (!listing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2979FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Title at Top */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Listing Details</Text>
        </View>

        {/* Image with rounded top */}
        {listing.images.length > 0 ? (
          <Image
            source={{ uri: listing.images[0] }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.noImagesText}>No images available</Text>
        )}

        {/* Card-style main content */}
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{listing.landlordName}</Text>
          <Text style={styles.description}>{listing.landlordDescription}</Text>

          {listing.location ? (
            <Text style={styles.details}>📍 {listing.location}</Text>
          ) : null}

          {listing.condoFeatures ? (
            <Text style={styles.details}>🏢 {listing.condoFeatures}</Text>
          ) : null}

          {listing.price ? (
            <Text style={styles.price}>{listing.price}</Text>
          ) : null}

          {/* Contact Button */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => alert("Contacting Landlord...")}
          >
            <Text style={styles.contactText}>Contact Landlord</Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={listing.onBack}
          >
            <Text style={styles.backButtonText}>← Back to Listings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Now black
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  noImagesText: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
    textAlign: "center",
  },
  cardContainer: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2979FF",
    marginVertical: 12,
  },
  contactButton: {
    backgroundColor: "#2979FF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#E3F2FD",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#2979FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListingDetails;

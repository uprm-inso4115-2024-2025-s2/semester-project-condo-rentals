<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import RentalListingCard from "../../components/ListingsPreview";
import CondoDetails from "../../components/ListingsDetails";
import { supabase } from "../../backend/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const [showListingInfo, setShowListingInfo] = useState(false);
  const [showHelpTip, setShowHelpTip] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/auth");
        return;
      }

      setUser(data.user);
      setIsVerified(!!data.user.email_confirmed_at);
      setLoading(false);

      if (!data.user.email_confirmed_at) {
        Alert.alert(
          "Email Verification Required",
          "Please verify your email before accessing the listings."
        );
      }
    };

    checkUserStatus();
  }, []);

  const resendVerificationEmail = async () => {
    if (!user?.email) return;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "A new verification email has been sent.");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Logout Failed", error.message);
    else {
      await AsyncStorage.clear();
      router.replace("/auth");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isVerified) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>
          You must verify your email before accessing the listings.
        </Text>
        <TouchableOpacity style={styles.resendButton} onPress={resendVerificationEmail}>
          <Text style={styles.resendText}>Resend Verification Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
=======
import React from "react";
import { View, ScrollView, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import RentalListingCard from "../../components/ListingsPreview";

const Listings = () => {
  const router = useRouter();
>>>>>>> main

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
<<<<<<< HEAD
=======
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
>>>>>>> main
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Título + ícono de ayuda */}
      <View style={styles.titleRow}>
        <Text style={styles.header}>Available Listings</Text>
        <TouchableOpacity onPress={() => setShowListingInfo(!showListingInfo)}>
          <Ionicons name="information-circle-outline" size={22} color="#555" />
        </TouchableOpacity>
      </View>
      {showListingInfo && (
        <Text style={styles.tooltip}>
          These listings are updated weekly and show available rentals near UPRM.
        </Text>
      )}

      <TouchableOpacity onPress={() => setShowHelpTip(!showHelpTip)} style={{ marginBottom: 8 }}>
        <Ionicons name="help-circle-outline" size={20} color="#5b8df6" />
      </TouchableOpacity>
      {showHelpTip && (
        <Text style={styles.tipBox}>
          🔹 Tip: Look for apartments with WiFi, parking, and air conditioning.
        </Text>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {listings.map((listing, index) => (
            <RentalListingCard
              key={index}
              landlordName={listing.landlordName}
              priceLocation={`${listing.price} - ${listing.location}`}
              onPress={() =>
                router.push("/(tabs)/ListingDetails")
              }
            />
          ))}
        </View>
      </ScrollView>
<<<<<<< HEAD

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
=======
>>>>>>> main
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  logoutButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#e63946",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    zIndex: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tooltip: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    color: "#333",
  },
  tipBox: {
    backgroundColor: "#eef6ff",
    borderColor: "#5b8df6",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#333",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
    textAlign: "center",
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  resendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Listings;

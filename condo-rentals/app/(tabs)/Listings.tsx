import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import RentalListingCard from "../../components/ListingsPreview";
import { supabase } from "../../backend/supabaseClient"; // Make sure you have the supabase client set up

// Define the type for the mapped listing
interface Listing {
  landlordName: string;
  landlordDescription: string;
  location: string;
  condoFeatures: string;
  price: string;
  images: string[];
}

const Listings = () => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('condos') // This is your Supabase table name
      .select('*');

    if (error) {
      console.error('Error fetching listings:', error);
    } else {
      const mappedListings = data.map((listing: any) => ({
        landlordName: listing.host_name,
        landlordDescription: listing.description,
        location: `${listing.city} - ${listing.area}`,
        condoFeatures: listing.title,
        price: listing.price_per_night
          ? `$${listing.price_per_night} per night`
          : 'Price not available',
        images: [listing.image],
      }));

      setListings(mappedListings);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {listings.map((listing, index) => (
            <RentalListingCard
              key={index}
              landlordName={listing.landlordName}
              priceLocation={`${listing.price} - ${listing.location}`}
              onPress={() => router.push("/(tabs)/ListingDetails")}
            />
          ))}
        </View>
      </ScrollView>
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

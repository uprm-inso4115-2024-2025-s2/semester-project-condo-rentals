// Home.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import TrustedLandlords from "../../components/TrustedLandlords"
// Sample data
import { getNewestCondos } from "@/backend/queries/newest_condos";
import getAreas from "@/backend/queries/areas";
import ListingDetails from "@/components/ListingDetails";
        
const landlords = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

type Listing = {
  condo_id: number;
  title: string;
  image: string;
  city: string;
  num_bedrooms: number;
  num_bathrooms: number;
  has_parking: boolean;
  is_pet_friendly: boolean;
  price_per_night: number;
};

type Area = {
  area: string;
  image_url: string;
};

interface BodyProps {
  newListings: Listing[];
  areas: Area[];
}

const categories = [
  { id: 1, name: "1 Bedroom", icon: "bed-outline" },
  { id: 2, name: "2 Bedrooms", icon: "bed" },
  { id: 3, name: "Parking Included", icon: "car" },
  { id: 4, name: "Pets Allowed", icon: "paw" },
];

const Header = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
    }}
  >
    <Icon name="person-circle-outline" size={30} />
    <Text style={{ fontSize: 22, fontWeight: "bold" }}>CondoRentals</Text>
    <View style={{ flexDirection: "row" }}>
      <Icon
        name="notifications-outline"
        size={25}
        style={{ marginRight: 10 }}
      />
      <Icon name="settings-outline" size={25} />
    </View>
  </View>
);

const Body = ({ newListings, areas }: BodyProps) => {
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalReady, setModalReady] = useState(false);


  const handleListingPress = (item: Listing) => {
    const features = [
      `${item.num_bedrooms} Bedroom${item.num_bedrooms !== 1 ? "s" : ""}`,
      `${item.num_bathrooms} Bathroom${item.num_bathrooms !== 1 ? "s" : ""}`,
      item.has_parking ? "Parking" : null,
      item.is_pet_friendly ? "Pet Friendly" : null,
    ]
      .filter(Boolean)
      .join(", ");

    const listingDetails = {
      images: [item.image],
      landlordName: "Trusted Landlord",
      landlordDescription: "Verified landlord with excellent reviews.",
      location: item.city,
      condoFeatures: features,
      price: `$${item.price_per_night}/night`,
    };
    setSelectedListing(listingDetails);
    setIsModalVisible(true);
  };

  const handleModalShow = () => {
    setModalReady(true);
  };

  const handleModalHide = () => {
    setModalReady(false);
    setIsModalVisible(false);
    setSelectedListing(null);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trusted Landlords */}
        <TrustedLandlords/>

        {/* New Listings */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}>
          New Listings →
        </Text>
        <FlatList
          horizontal
          data={newListings}
          keyExtractor={(item) => item.condo_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleListingPress(item)}>
              <View style={{ paddingLeft: 5, marginBottom: 10 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 250, height: 150, borderRadius: 10, margin: 10 }}
                />
                {item.title ? (
                  <Text
                    style={{
                      width: 250,
                      fontSize: 14,
                      fontWeight: "500",
                      paddingLeft: 10,
                    }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                ) : null}
                {item.city ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      paddingLeft: 10,
                    }}
                  >
                    {item.city}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Find by Category */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}>
          Find by Category →
        </Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", margin: 15 }}>
              <Icon name={item.icon} size={30} />
              {item.name ? (
                <Text>{item.name}</Text>
              ) : null}
            </View>
          )}
        />

        {/* Search by Area */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}>
          Search by Area →
        </Text>
        <FlatList
          horizontal
          data={areas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ margin: 10, alignItems: "center" }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  overflow: "hidden",
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  backgroundColor: "#eee",
                }}
              >
                <ImageBackground
                  source={{ uri: item.image_url }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  resizeMode="cover"
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      flex: 1,
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.area ? (
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 12,
                          textAlign: "center",
                          paddingHorizontal: 5,
                        }}
                        numberOfLines={2}
                      >
                        {item.area}
                      </Text>
                    ) : null}
                  </View>
                </ImageBackground>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* Modal for Listing Details */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleModalHide}
        onShow={handleModalShow}
      >
        {modalReady && selectedListing && (
          <ListingDetails
            listing={{
              ...selectedListing,
              onBack: handleModalHide,
            }}
          />
        )}
      </Modal>
    </>
  );
};


const HomeScreen = () => {
  const [newestListings, setNewestListings] = useState<Listing[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchCondos = async () => {
      try {
        const newest_condos = await getNewestCondos();
        setNewestListings(newest_condos);
        const fetchedAreas = await getAreas();
        setAreas(fetchedAreas);
      } catch (error) {
        console.error("Failure to fetch new condos: ", error);
      }
    };
    fetchCondos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header />
      <Body newListings={newestListings} areas={areas} />
    </SafeAreaView>
  );
};

export default HomeScreen;

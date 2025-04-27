import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { getNewestCondos } from "@/backend/queries/newest_condos";

// Sample data
const landlords = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
type Listing = {
  condo_id: number;
  title: string;
  image: string;
  city: string;
};

interface BodyProps {
  newListings: Listing[];
}

const categories = [
  { id: 1, name: "1 Bedroom", icon: "bed-outline" },
  { id: 2, name: "2 Bedrooms", icon: "bed" },
  { id: 3, name: "Parking Included", icon: "car" },
  { id: 4, name: "Pets Allowed", icon: "paw" },
];
const areas = ["Paris", "Terrace", "Trastalleres"];

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

const Body = ({ newListings }: BodyProps) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    {/* Trusted Landlords */}
    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}>
      Trusted Landlords →
    </Text>
    <FlatList
      horizontal
      data={landlords}
      keyExtractor={(item) => item.id.toString()}
      renderItem={() => (
        <View style={{ margin: 10, alignItems: "center" }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#ccc",
            }}
          />
          <Text>Name</Text>
        </View>
      )}
    />

    {/* New Listings */}
    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15 }}>
      New Listings →
    </Text>
    <FlatList
      horizontal
      data={newListings}
      keyExtractor={(item) => item.condo_id.toString()}
      renderItem={({ item }) => (
        <View style={{ paddingLeft: 5, marginBottom: 10 }}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{ width: 250, height: 150, borderRadius: 10, margin: 10 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500", paddingLeft: 10 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "500", paddingLeft: 10 }}>
            {item.city}
          </Text>
        </View>
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
          <Text>{item.name}</Text>
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
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#ddd",
            margin: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{item}</Text>
        </View>
      )}
    />
  </ScrollView>
);

const HomeScreen = () => {
  const [newestListings, setNewestListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchCondos = async () => {
      try {
        const data = await getNewestCondos();
        setNewestListings(data);

        for (let i = 0; i < newestListings.length; i++) {
          console.log("IMAGE = " + newestListings[i].image);
        }
      } catch (error) {
        console.error("Failure to fetch new condos: ", error);
      }
    };
    fetchCondos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header />
      <Body newListings={newestListings} />
    </SafeAreaView>
  );
};

export default HomeScreen;

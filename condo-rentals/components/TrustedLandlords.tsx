import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getTrustedLandlords } from "../backend/queries/trustedLandlords"

interface Landlord {
  ownerId: string;
  name: string;
  profileImage: string | null;
  trustScore: number;
}
interface SupabaseLandlord {
  id: string;
  name: string;
  profileImage: string | null;
  is_verified: boolean;
  average_rating: number | null;
  successful_rentals: number | null;
}

const TrustedLandlords: React.FC = () => {
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrustedLandlords() {
      try {
        const data = await getTrustedLandlords();

        if (data) {
          const mappedLandlords: Landlord[] = (data as SupabaseLandlord[]).map((owner) => ({
            ownerId: owner.id,
            name: owner.name,
            profileImage: owner.profileImage,
            trustScore:
              (owner.is_verified ? 50 : 0) +
              (owner.average_rating || 0) * 10 +
              (owner.successful_rentals || 0),
          }));

          mappedLandlords.sort((a, b) => b.trustScore - a.trustScore);
          setLandlords(mappedLandlords);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrustedLandlords();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />;
  }

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 15, marginTop: 10 }}>Trusted Landlords →</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={landlords}
        keyExtractor={(item) => item.ownerId.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 10, alignItems: "center" }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {item.profileImage ? (
                <Image
                  source={{ uri: item.profileImage }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              ) : (
                <Icon name="person-outline" size={30} color="#555" />
              )}
            </View>
            <Text style={{ marginTop: 5 }}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TrustedLandlords;


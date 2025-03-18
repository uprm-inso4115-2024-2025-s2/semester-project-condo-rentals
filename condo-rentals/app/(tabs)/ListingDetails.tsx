import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Asegúrate de usar este hook para obtener los parámetros
const { width } = Dimensions.get("window");

const ListingDetails = () => {
  const { listing } = useLocalSearchParams();  // Obtienes los parámetros de la URL
  const listingDetails = listing ? JSON.parse(listing as string) : null;

  return (
    <View style={styles.container}>
      {listingDetails ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mostrar imágenes estáticas */}
          {listingDetails.images.length > 0 ? (
            listingDetails.images.map((item: string, index: number) => (
              <Image key={index} source={{ uri: item }} style={styles.image} />
            ))
          ) : (
            <Text style={styles.noImagesText}>No images available</Text>
          )}

          {/* Mostrar detalles del listing */}
          <Text style={styles.title}>{listingDetails.landlordName}</Text>
          <Text style={styles.description}>{listingDetails.landlordDescription}</Text>
          <Text style={styles.details}>{listingDetails.location}</Text>
          <Text style={styles.details}>{listingDetails.condoFeatures}</Text>
          <Text style={styles.price}>{listingDetails.price}</Text>

          {/* Botón de contacto */}
          <TouchableOpacity style={styles.contactButton} onPress={() => alert("Contacting Landlord...")}>
            <Text style={styles.contactText}>Contact Landlord</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>No listing details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
  noImagesText: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  details: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#337137",
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: "#337137",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});


export default ListingDetails;
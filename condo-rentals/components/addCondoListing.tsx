import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";

type AddCondoListingProps = {
  onAdd: (newListing: {
    id: number;
    name: string;
    description: string;
    location: { latitude: number; longitude: number };
    town: string;
    price: number;
    imageUrl: string;
  }) => void;
};

export default function AddCondoListing({ onAdd }: AddCondoListingProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = async () => {
    if (!name || !description || !town || !price || !address) {
      Alert.alert("Missing fields", "Please fill in all required fields.");
      return;
    }

    try {
      const geoResults = await Location.geocodeAsync(address);
      if (geoResults.length === 0) {
        Alert.alert("Invalid address", "Could not geocode the address.");
        return;
      }

      const { latitude, longitude } = geoResults[0];

      const newListing = {
        id: Date.now(),
        name,
        description,
        location: { latitude, longitude },
        town,
        price: parseFloat(price),
        imageUrl: imageUrl || "https://example.com/condo1.jpg",
      };

      onAdd(newListing);
      setModalVisible(false);
      resetForm();
      Alert.alert("Listing Added", "Your listing was successfully added!");
    } catch (error) {
      console.error("Geocoding error:", error);
      Alert.alert("Error", "Failed to convert address to coordinates.");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setTown("");
    setPrice("");
    setAddress("");
    setImageUrl("");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Add Condo Listing</Text>

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <TextInput
              placeholder="Town"
              value={town}
              onChangeText={setTown}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Address (e.g., 123 Main St, Mayaguez)"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChangeText={setImageUrl}
              style={styles.input}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.button, { backgroundColor: "#ccc" }]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} style={styles.button}>
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  openButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

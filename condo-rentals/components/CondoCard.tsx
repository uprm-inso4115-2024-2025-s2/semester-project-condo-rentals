import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CondoCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onPress?: () => void;
}

const CondoCard: React.FC<CondoCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.cardPrice}>${price} / night</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CondoCard;
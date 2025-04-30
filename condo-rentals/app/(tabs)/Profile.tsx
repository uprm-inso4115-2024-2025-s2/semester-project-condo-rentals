import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Listings() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header for go back button */}
      <View style={styles.headerButton}>
        {/* Go Back button */}
        {/* router currently returns to landing but will be changed to return to login page once implemented */}
        <TouchableOpacity onPress={() => router.push("/Landing")} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Header for Condo Rentals logo */}
      <View style={styles.headerLogo}>
        {/* Condo Rentals Logo Container */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Condo Rental Assets/Condo_Logo.png')} style={styles.logo} />
        </View>
      </View>

      {/* Placeholder Text */}
      <View style={styles.textContainer}>
        <Text>User Authentication & Profile Team</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  headerButton: {
    width: "25%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  goBackButton: {
    backgroundColor: "#1565C0",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10
  },

  goBackButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },

  headerLogo: {
    width: "100%",
    height: "0%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  logoContainer: {
    width: 50, 
    height: 95,
    overflow: 'hidden',
    marginBottom: 20,
  },

  logo: {
    width: 125,
    height: 125,
    marginTop: -20,
    marginLeft: -37,
    resizeMode: 'cover'
  },

  textContainer: {
    padding: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
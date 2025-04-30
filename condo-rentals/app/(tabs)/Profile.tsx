import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Listings() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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

  header: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  logoContainer: {
    width: 50, 
    height: 75,
    overflow: 'hidden',
    marginBottom: 20
  },

  logo: {
    width: 125,
    height: 125,
    marginTop: -20,
    marginLeft: -37,
    resizeMode: 'cover',
  },

  textContainer: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
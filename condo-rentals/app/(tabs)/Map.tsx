import { Text, TouchableOpacity, View, Image} from "react-native";
import MapView from 'react-native-maps';
import {
  StyleSheet} from "react-native"


export default function Map() {
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

  <MapView style={styles.map} />

  <TouchableOpacity style={styles.centerbutton}>
    <Image 
    source={require("../../assets/images/Condo Rental Assets/Condo_UserLocation.png")}
    style={styles.buttonImage} 
    />
  </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",

  },
  centerbutton: {
    position: "absolute",
    bottom: "12%",
    right: 20,
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 45/2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width:35,
    height: 35,
    resizeMode: "contain",
  },
});
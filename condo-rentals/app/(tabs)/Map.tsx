import { Text, View } from "react-native";
import MapView from 'react-native-maps';
import {StyleSheet} from "react-native"
import * as Location from "expo-location";
import { useEffect, useState } from "react";


export default function Map() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >



<MapView 
  style={styles.map} 
  // showsMyLocationButton={true}
  showsUserLocation={true}
  
  // Initial Location set to UPRM
  // TODO: Update to user location always 
  initialRegion={{
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  }}
/>


    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",
  },
});
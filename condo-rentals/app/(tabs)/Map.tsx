import { Text, TouchableOpacity, View, Image} from "react-native";
import MapView from 'react-native-maps';
import {
  StyleSheet} from "react-native"
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";
import { MapListingsService } from "@/components/MapListingsService";
import React, {useEffect, useState, useRef} from "react";
import * as Location from "expo-location";


export default function Map() {

  const [listings, setListings] = useState<CondoMarkerProps[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    setListings(new MapListingsService().listing);

  }, []);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status != 'granted') {
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      setLocation(userLocation);
    }) ();
  }, []);

  const goToCurrentLocation = async () => {
    if(location && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
  };

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >



      <MapView 
        ref={mapRef}
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
      >
        {listings.map((listing, index) => (
          <CondoMarker key={index} id={listing.id} name={listing.name} description={listing.description} location={listing.location}/>
        ))}

        
        

        
      </MapView>

    <TouchableOpacity style={styles.centerbutton} onPress={goToCurrentLocation}>
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
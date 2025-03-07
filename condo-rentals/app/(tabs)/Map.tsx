import { Text, View } from "react-native";
import MapView from 'react-native-maps';
import {
  StyleSheet} from "react-native"
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";
import { MapListingsService } from "@/components/MapListingsService";
import React, {useEffect, useState} from "react";

export default function Map() {

  const [listings, setListings] = useState<CondoMarkerProps[]>([]);
  useEffect(() => {
    setListings(new MapListingsService().listing);

  }, []);



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
      >
        {listings.map((listing, index) => (
          <CondoMarker key={index} id={listing.id} name={listing.name} description={listing.description} location={listing.location}/>
        ))}

        
        

        
      </MapView>


    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",

  },
});
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";
import { MapListingsService } from "@/components/MapListingsService";
import CondoCard from "@/components/CondoCard"; // Import the CondoCard component
import AddCondoListing from "@/components/addCondoListing";


export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [listings, setListings] = useState<CondoMarkerProps[]>([]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    setListings(new MapListingsService().listing);
  }, []);


  const [visibleRegion, setVisibleRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  
  const getVisibleListings = (listings: CondoMarkerProps[], region: any) => {
    return listings.filter((listing) => {
      const { latitude, longitude } = listing.location;
      return (
        latitude >= region.latitude - region.latitudeDelta / 2 &&
        latitude <= region.latitude + region.latitudeDelta / 2 &&
        longitude >= region.longitude - region.longitudeDelta / 2 &&
        longitude <= region.longitude + region.longitudeDelta / 2
      );
    });
  };


  const visibleListings = getVisibleListings(listings, visibleRegion);


  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={visibleRegion}
        onRegionChangeComplete={(region) => setVisibleRegion(region)}

      >
        {listings.map((listing, index) => (
          <CondoMarker
            key={index}
            id={listing.id}
            name={listing.name}
            description={listing.description}
            location={listing.location}
            price={listing.price}
            imageUrl={listing.imageUrl}
          />
        ))}
      </MapView>

      <View style={styles.addCondoButtonContainer}>
      <AddCondoListing />
    </View>

      <TouchableOpacity style={styles.centerbutton}>
        <Image
          source={require("../../assets/images/Condo Rental Assets/Condo_UserLocation.png")}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      
<ScrollView horizontal style={styles.cardList}>
  {visibleListings.map((listing) => (
    <CondoCard
      key={listing.id}
      id={listing.id}
      name={listing.name}
      description={listing.description}
      price={listing.price}
      imageUrl={listing.imageUrl}
      onPress={() => console.log("Condo pressed:", listing.id)}
    />
  ))}
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "70%",
  },
  centerbutton: {
    position: "absolute",
    bottom: "30%",
    right: 20,
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  cardList: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  addCondoButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40, // Added fixed width
    height: 40, // Added fixed height
    borderRadius: 10, // Added rounded corners (smaller value than width/2 for squared look)
    overflow: 'hidden', // This ensures the content respects the border radius
  },
});

// import { Text, TouchableOpacity, View, Image} from "react-native";
// import MapView from 'react-native-maps';
// import * as Location from "expo-location";
// import {
//   StyleSheet} from "react-native"
// import CondoMarker from "@/components/CondoMarker";
// import { CondoMarkerProps } from "@/components/InterfaceMarker";
// import { MapListingsService } from "@/components/MapListingsService";
// import React, {useEffect, useState} from "react";


// export default function Map() {

//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   useEffect(() => {
//     async function getCurrentLocation() {
      
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     }

//     getCurrentLocation();
//   }, []);

//   let text = 'Waiting...';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
//   const [listings, setListings] = useState<CondoMarkerProps[]>([]);
  
//   useEffect(() => {
//     setListings(new MapListingsService().listing);

//   }, []);



//   return (
    
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >



//       <MapView 
//         style={styles.map} 
//         // showsMyLocationButton={true}
//         showsUserLocation={true}
        
//         // Initial Location set to UPRM
//         // TODO: Update to user location always 
//         initialRegion={{
//           latitude: 18.2106,
//           longitude: -67.1396,
//           latitudeDelta: 0.009,
//           longitudeDelta: 0.009,
//         }}
//       >
//         {listings.map((listing, index) => (
//           <CondoMarker key={index} id={listing.id} name={listing.name} description={listing.description} location={listing.location} />
//         ))}

        
        

        
//       </MapView>

//     <TouchableOpacity style={styles.centerbutton}>
//       <Image 
//       source={require("../../assets/images/Condo Rental Assets/Condo_UserLocation.png")}
//       style={styles.buttonImage} 
//       />
//     </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     width: "100%",
//     height: "80%",
//   },
//   centerbutton: {
//     position: "absolute",
//     bottom: "12%",
//     right: 20,
//     backgroundColor: "white",
//     width: 45,
//     height: 45,
//     borderRadius: 45/2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonImage: {
//     width:35,
//     height: 35,
//     resizeMode: "contain",
//   },
// });
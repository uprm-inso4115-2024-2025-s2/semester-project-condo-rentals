import { Text, TouchableOpacity, View, Image, Animated, Dimensions, StyleSheet, ScrollView, Alert} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";
import { MapListingsService } from "@/components/MapListingsService";
import React, { useEffect, useState, useRef } from "react";
import CondoCard from "@/components/CondoCard"; // Import the CondoCard component
import AddCondoListing from "@/components/addCondoListing";
import getAllProperties from "../../backend/controllers/propertyController"


const { width } = Dimensions.get('window');





export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ListingService, setListingService] = useState<MapListingsService>(new MapListingsService(InitData))
  const [listings, setListings] = useState<CondoMarkerProps[]>([]);
  const mapRef = useRef<MapView>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [townQueary, setTown] = useState(" ");
  const [townFilter, setTownFilter] = useState(" ");
  const animation = useRef(new Animated.Value(0)).current;

  
  function filterData(Object:MapListingsService, param:string): void{
    if(param === " "){

      



    
      Object.setListing(InitData)
      console.log(" im empty");
      setListingService(Object)

      return
    }

    // This should be done with SQL but its being done with JavaScript for now
    let Data: CondoMarkerProps[] = []
    for (let i=0;i<InitData.length;i++){
      if (InitData[i].town.includes(param)){
        Data.push(InitData[i]);
      }
    }

    Object.setListing(Data)
    setListingService(Object)

  }


  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg('Permission to access location was denied');
        Alert.alert("Location Access Denied", "Please enable location permissions in settings.", [
          { text: "OK" }
        ]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    try {
      filterData(ListingService, townQueary);
      setListings(ListingService.listing);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  }, [townQueary]);

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
        altitude: 2000,
        zoom: 15,
      });
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(animation, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const menuTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.7, 0],
  });

  const [visibleRegion, setVisibleRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const getVisibleListings = (listings: CondoMarkerProps[], region: any) => {
    return listings.filter((listing) => {
      const latitude = listing.latitude;
      const longitude = listing.longitude;
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
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={visibleRegion}
        onRegionChangeComplete={(region) => setVisibleRegion(region)}

      >
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            
            <CondoMarker
            key={index}
            condo_id={listing.condo_id}
            title={listing.title}
            description={listing.description}
            address = {listing.address}
            city = {listing.city}
            state_province = {listing.state_province}
            country = {listing.country}
            postal_code = {listing.postal_code}
            latitude =  {listing.latitude}
            longitude = {listing.longitude}
            num_bedrooms = {listing.num_bedrooms}
            num_bathrooms = {listing.num_bathrooms}
            max_guests = {listing.max_guests}
            square_footage = {listing.square_footage}
            price_per_night = {listing.price_per_night}
            is_available  = {listing.is_available}
            status = {listing.status}
            host_name = {listing.host_name}
            image_url = {listing.image_url}
          />
          ))
        ) : (
          <Text style={styles.errorText}>No listings found</Text>
        )}
      </MapView>

      <TouchableOpacity style={styles.userLocationButton} onPress={goToCurrentLocation}>
        <Image 
        source={require("../../assets/images/Condo Rental Assets/Condo_UserLocation.png")}
        style={styles.buttonImage}
        />
      </TouchableOpacity>
    
    <View style={styles.addCondoButtonContainer}>
      <AddCondoListing />
    </View>

      <Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuTranslateX }] },
        ]}
      >
        <Text style={styles.menuText}>Select Town:</Text>
        <DropDownPicker
            open={isMenuOpen}
            value={townQueary}
            items={[
              { label: "All", value: " " },
              { label: "Mayaguez", value: "Mayaguez" },
              { label: "Ponce", value: "Ponce" },
              { label: "Cabo Rojo", value: "Cabo Rojo" },
              { label: "San German", value: "San German" }
            ]}
            setOpen={setIsMenuOpen}
            setValue={setTown}
            placeholder="Select Town"
            containerStyle={{ marginTop: 10 }}
          />
        <TouchableOpacity style={styles.confirmButton} onPress={() => setTownFilter(townQueary)}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.menuToggleButton} onPress={toggleMenu}>
        <Text>Menu</Text>
      </TouchableOpacity>
      
      <ScrollView horizontal style={styles.cardList}>
        {visibleListings.map((listing) => (
          <CondoCard
            key={listing.condo_id}
            id={listing.title}
            name={listing.title}
            description={listing.description}
            price={listing.price_per_night}
            imageUrl={listing.image_url}
            onPress={() => console.log("Condo pressed:", listing.title)}
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
  userLocationButton: {
    position: "absolute",
    bottom: "35%",
    right: "5%",
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
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.7,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    zIndex: 10,
  },
  menuToggleButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    zIndex:11,
  },
  menuText: { fontSize: 16, fontWeight: "bold", marginTop: 100 },

  confirmButton: { backgroundColor: "lightblue", padding: 10, borderRadius: 5, marginTop: 200, alignItems: "center" },
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
  errorText: { position: "absolute", top: 80, left: 20, color: "red" },
});


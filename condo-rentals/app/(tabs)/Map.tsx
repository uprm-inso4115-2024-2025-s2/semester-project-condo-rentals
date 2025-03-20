import { Text, TouchableOpacity, View, Image, Animated, Dimensions, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";
import { MapListingsService } from "@/components/MapListingsService";
import React, { useEffect, useState, useRef } from "react";

const { width } = Dimensions.get('window');

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [listings, setListings] = useState<CondoMarkerProps[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    setListings(new MapListingsService().listing);
  }, []);

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 18.2106,
          longitude: -67.1396,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      >
        {listings.map((listing, index) => (
          <CondoMarker key={index} id={listing.id} name={listing.name} description={listing.description} location={listing.location} town={listing.town} />
        ))}
      </MapView>

      <TouchableOpacity style={styles.centerbutton}>
        <Image
          source={require("../../assets/images/Condo Rental Assets/Condo_UserLocation.png")}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuTranslateX }] },
        ]}
      >
        {/* <TouchableOpacity style={styles.menuCloseButton} onPress={toggleMenu}>
          <Text>Close</Text>
        </TouchableOpacity> */}
        {/* <Text>Menu Item 1</Text>
        <Text>Menu Item 2</Text>
        <Text>Menu Item 3</Text> */}
        {/* Add your menu items here */}
      </Animated.View>

      <TouchableOpacity style={styles.menuToggleButton} onPress={toggleMenu}>
        <Text>Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  centerbutton: {
    position: "absolute",
    bottom: "12%",
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
    top: 40,
    left: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    zIndex:11,
  },
    menuCloseButton:{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    }
});
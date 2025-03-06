import { Text, View } from "react-native";
import MapView from 'react-native-maps';
import {
  StyleSheet} from "react-native"
import CondoMarker from "@/components/CondoMarker";
import { CondoMarkerProps } from "@/components/InterfaceMarker";

export default function Map() {

  let Example: CondoMarkerProps = {
    id: 1,
    name: "Condo Name",
    description: "Condo Description",
    location: {
      latitude: 18.2106,
      longitude: -67.1396,
    }
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
      >
        <CondoMarker id={Example.id} name={Example.name} description={Example.description} location={Example.location}/>
        
        

        
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
import React from "react";
import { View, Image } from "react-native";
import { CondoMarkerProps} from "./InterfaceMarker";
import { Marker } from "react-native-maps";



export default function CondoMarker(Details: CondoMarkerProps) {


  return (
    
    <Marker
      coordinate={{latitude : Details.latitude ,  longitude: Details.longitude}}
      title={Details.title}
      description={Details.description}>
        <Image source={require("../assets/images/Condo Rental Assets/Condo_MapMarker.png")} style={{height: 50, width: 50}} />
        

    </Marker>
    );
}
import { Text, View } from "react-native";
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


    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",

  },
});
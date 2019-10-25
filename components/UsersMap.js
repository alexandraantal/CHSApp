import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const usersMap = props => {
  let userLocationMarker = null;

  if (props.userLocation) {
    userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
  }
  return (
    <View style={styles.mapContainer}>
      <MapView
        initialRegion={{
          latitude: 45.75435812850045,
          longitude: 21.228919875782406,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        }}
        region={props.userLocation}
        style={styles.map}
      >
        {userLocationMarker}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "90%",
    marginTop: 20
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

export default usersMap;

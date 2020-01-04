import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const locations = require("./../buildings1.json");
const locations2 = require("./../buildings2.json");
const locations3 = require("./../buildings3.json");

const { width, height } = Dimensions.get("screen");

var mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        color: "#f57752"
      },
      {
        saturation: -40
      },
      {
        lightness: 15
      },
      {
        weight: 0.5
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f99982"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#30a5cb"
      },
      {
        weight: 1
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b7d9d7"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  }
];

class MapBuildingScreen extends React.Component {
  state = {
    latitude: 45.7494,
    longitude: 21.2272,
    locations: locations
  };

  async componentDidMount() {
    const {
      locations: [sampleLocation]
    } = this.state;
  }

  onMarkerPress = location => () => {
    const {
      coords: { latitude, longitude }
    } = location;
    this.setState({
      destination: location
    });
  };

  renderMarkers = () => {
    const { locations } = this.state;
    return (
      <View>
        {locations.map((location, idx) => {
          const {
            coords: { latitude, longitude }
          } = location;
          const IconOne = require("./../images/orange-pin.png");
          const IconTwo = require("./../images/red-pin.png");
          let icon = location.markerIcon == 1 ? IconOne : IconTwo;

          return (
            <Marker
              key={idx}
              coordinate={{ latitude, longitude }}
              onPress={this.onMarkerPress(location)}
            >
              <Image source={icon} style={{ height: 15, width: 15 }} />
            </Marker>
          );
        })}
      </View>
    );
  };

  render() {
    const { latitude, longitude } = this.state;

    if (latitude) {
      return (
        <>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0421
            }}
            customMapStyle={mapStyle}
          >
            {this.renderMarkers()}
          </MapView>
        </>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {<Text>Loading...</Text>}
      </View>
    );
  }
}

export default MapBuildingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  marker1: {
    backgroundColor: "#FFE633",
    padding: 5,
    borderRadius: 5
  },
  marker2: {
    backgroundColor: "#FF9633",
    padding: 5,
    borderRadius: 5
  },
  marker3: {
    backgroundColor: "#FF3333",
    padding: 5,
    borderRadius: 5
  }
});

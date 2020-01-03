import React from "react";
import { StyleSheet, Text, View, Dimensions, Button, Image} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";

const locations = require('./../locations.json');
const { width, height } = Dimensions.get('screen');
const GOOGLE_MAP_APIKEY = 'AIzaSyB_1OsFmvwn5K3s8NOyOrqJXibIjnzHZI4';
min=10000000;

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


class MapEscapeRouteScreen extends React.Component {
  state = {
      latitude: null,
      longitude: null,
    locations: locations
  };

  async componentDidMount(){

    navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
        (error) => this.setState({ error: error.message })
      );

    const { locations: [ sampleLocation ] } = this.state;

    this.setState({
        desLatitude: sampleLocation.coords.latitude,
        desLongitude: sampleLocation.coords.longitude
      }, this.mergeCoords);
    //  console.log(locations)

  };

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } = location
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
  
    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance; // in meters
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            return (
              <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                title={location.name}
                onPress={this.onMarkerPress(location)}
              />
            )
          })
        }
      </View>
    )
  }

  getCoords = () =>{
    const { locations } = this.state
    const coords1 = locations.map(p => p.coords)
     for(i=0; i<11; i++)
     {
       aux=this.calculateDistance(coords1[i].latitude, coords1[i].longitude,this.state.latitude, this.state.longitude)
       if(aux<min) min=aux
     }

     for(i=0; i<11; i++)
     {
      aux=this.calculateDistance(coords1[i].latitude, coords1[i].longitude,this.state.latitude, this.state.longitude)
      if(aux==min) console.log(coords1[i].latitude,coords1[i].longitude)
     }
    
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state
    

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_MAP_APIKEY}`)
      const respJson = await resp.json();
     const response = respJson.routes[0]
     const distanceTime = response.legs[0]
     const distance = distanceTime.distance.text
     const time = distanceTime.duration.text
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
       this.setState({  coords, distance, time })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  render() {
    const {
        latitude,
        longitude,
        destination,
        coords,
        distance,
        time
       } = this.state
  
        if(latitude) {
        return (
            <>
             <View
            style={{
              width,
              paddingTop: 10,
              paddingBottom: 10,
              alignSelf: 'center',
              alignItems: 'center',
              height: height * 0.10,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ fontWeight: 'bold' }}>Estimated Time: {time}</Text>
            <Text style={{ fontWeight: 'bold' }}>Estimated Distance: {distance}</Text>
          </View>
       <MapView
         showsUserLocation
            style={{flex: 1}}
            initialRegion={{
                latitude,    
                longitude,     
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421
              }}
              customMapStyle={mapStyle}  
        > 
        {this.renderMarkers()} 
        {this.getCoords()}
        { this.state.coords && 
        <MapView.Polyline
            strokeWidth={2}
            strokeColor="red"
            coordinates={coords}
          /> }
        </MapView>
        <Image
          source={{ uri: destination && destination.image_url }}
          style={{
            flex: 1,
            width: width * 0.95,
            alignSelf: 'center',
            height: height * 0.15,
            position: 'absolute',
            bottom: height * 0.05
          }}
        />
        </>
        );}

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              { <Text>Loading...</Text> }
            </View>
            )

      }
     
  }

export default MapEscapeRouteScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });
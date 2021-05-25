import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import GcooterMarker from '../../components/svg/GcooterMarker';

export default function App() {
  const initialRegion = {
    latitude: 37.62353703396386,
    longitude: 127.06104452210563,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [{
    latlng: { latitude : 37.62353703396386 , longitude : 127.06104452210563 },
    title: 'test',
    description: 'description test',
  }];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
            <GcooterMarker size={80} fill="#000000" />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
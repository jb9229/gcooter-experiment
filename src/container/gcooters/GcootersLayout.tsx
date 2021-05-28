import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import GcooterMarker from '../../components/svg/GcooterMarker';
import { useRecoilValue } from 'recoil';
import { vehiclesOfMap } from './store';
import styled from 'styled-components/native';

const MarkerWrap = styled.TouchableOpacity``;

const GcootersLayout: React.FC = () => {
  // states
  const [selectedMarker, setSelectedMarker] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ASPECT_RATIO = windowWidth / windowHeight;
  const vehicles = useRecoilValue(vehiclesOfMap);

  const initialRegion = {
    latitude: 37.62353703396386,
    longitude: 127.06104452210563,
    latitudeDelta: 0.0112,
    longitudeDelta: 0.0112 * ASPECT_RATIO,
  };

  const markers = vehicles.map((vehicle) => ({
    id: vehicle.id,
    latlng: {
      latitude: Number.parseFloat(vehicle.lat),
      longitude: Number.parseFloat(vehicle.lng),
    },
    title: vehicle.title,
    description: vehicle.description,
    battery: vehicle.battery,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        {markers.map((marker, index) => (
          <MarkerWrap
            key={marker.id}
            onPress={() => setSelectedMarker(marker.id)}
          >
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
              {selectedMarker === marker.id ? (
                <GcooterMarker
                  size={40}
                  fill="#000000"
                  backgroundColor="#072c1a"
                  selected={true}
                  battery={marker.battery}
                />
              ) : (
                <GcooterMarker
                  size={40}
                  fill="#000000"
                  battery={marker.battery}
                />
              )}
            </Marker>
          </MarkerWrap>
        ))}
      </MapView>
    </View>
  );
};

export default GcootersLayout;

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

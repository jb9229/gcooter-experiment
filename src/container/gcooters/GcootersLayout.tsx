import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import GcooterMarker from '../../components/svg/GcooterMarker';
import { useRecoilValue } from 'recoil';
import { vehiclesOfMap } from './store';
import styled from 'styled-components/native';
import GcootersSubmitButton from './GcootersSubmitButton';
import { getNoParkingZoneQuery } from '../noparkingzone/store';

const MarkerWrap = styled.TouchableOpacity``;

const GcootersLayout: React.FC = () => {
  // states
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ASPECT_RATIO = windowWidth / windowHeight;
  const vehicles = useRecoilValue(vehiclesOfMap);
  const noParkingZones = useRecoilValue(getNoParkingZoneQuery);

  console.log(`noParkingZones: ${noParkingZones}`);

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

  const polygons: any[] = [];

  console.log('>>> re-render: [GcootersLayout] Com.');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        {markers.map((marker, index) => (
          <MarkerWrap testID={`marker-wrap-${index}`} key={marker.id}>
            <Marker
              testID={`marker-${index}`}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
              <GcooterMarker
                testID={`gcooter-marker-${index}`}
                id={marker.id}
                size={40}
                fill="#000000"
                battery={marker.battery}
              />
            </Marker>
          </MarkerWrap>
        ))}
        {polygons.map((polygon, index) => (
          <Polygon
            key={`KEY_${index}`}
            coordinates={polygon.coordinates}
            holes={holes}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        ))}
      </MapView>
      <GcootersSubmitButton />
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

import React from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import GcooterMarker from '../../../components/svg/GcooterMarker';
import { useRecoilValue } from 'recoil';
import { vehiclesOfMap } from './store';
import styled from 'styled-components/native';

const MarkerWrap = styled.TouchableOpacity``;

const GcootersLayout: React.FC = () => {
  // states
  const vehicles = useRecoilValue(vehiclesOfMap);

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

  return markers.map((marker, index) => (
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
  ));
  /* {polygons.map((polygon, index) => (
        <Polygon
          key={`KEY_${index}`}
          coordinates={polygon.coordinates}
          holes={holes}
          strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={1}
        />
      ))} */
};

export default GcootersLayout;

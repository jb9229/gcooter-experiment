import React, { Suspense } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import GcooterNoParkingZones from './noparkingzones/GcooterNoParkingZones';
// import GcootersSubmitButton from './gcooters/GcootersSubmitButton';
import styled from 'styled-components/native';

const GoogleMap = styled(MapView)`
  flex: 1;
`;

const MainMapContainer: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ASPECT_RATIO = windowWidth / windowHeight;

  const initialRegion = {
    latitude: 37.62353703396386,
    longitude: 127.06104452210563,
    latitudeDelta: 0.0112,
    longitudeDelta: 0.0112 * ASPECT_RATIO,
  };

  return (
    <GoogleMap showsUserLocation={true} initialRegion={initialRegion}>
      {/* <GcooterMarkers /> */}
      <Suspense fallback={<ActivityIndicator />}>
        <GcooterNoParkingZones />
      </Suspense>
      {/* <GcootersSubmitButton /> */}
    </GoogleMap>
  );
};

export default MainMapContainer;

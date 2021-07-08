import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { GET_VEHICLE_LIST_IN_BOUND } from '../../../utils/sample';
import GcootersLayout from './GcootersLayout';
import { vehiclesOfMap } from './store';

const GcootersContainer: React.FC = () => {
  //states
  const setVehiclesOfMap = useSetRecoilState(vehiclesOfMap);

  useEffect(() => {
    const result = GET_VEHICLE_LIST_IN_BOUND({
      location: {
        latitude: 37.62353703396386,
        longitude: 127.06104452210563,
      },
    })
      .then((rsp) => {
        const vehicles = rsp.data;

        setVehiclesOfMap(vehicles);
      })
      .catch((error) => {
        console.log(`failed vehicle list call!: ${error?.message}`);
        setVehiclesOfMap([]);
      });
  }, [setVehiclesOfMap]);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <GcootersLayout />
    </Suspense>
  );
};

export default GcootersContainer;

import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { GET_VEHICLE_LIST_IN_BOUND, VehicleResponse } from '../../utils/sample';
import GcootersLayout from './GcootersLayout';
import { vehiclesOfMap } from './store';

const GcootersContainer: React.FC = () => {
  //states
  const setVehiclesOfMap = useSetRecoilState(vehiclesOfMap);

  useEffect(() => {
    const rspOfVehicleList = (rsp: VehicleResponse): void => {
      const vehicles = rsp.data;

      setVehiclesOfMap(vehicles);
    };

    const failedVehicleList = (error: any): void => {
      console.log(`failed vehicle list call!: ${error?.message}`);
      setVehiclesOfMap([]);
    };

    const result = GET_VEHICLE_LIST_IN_BOUND({
      location: {
        latitude: 37.62353703396386,
        longitude: 127.06104452210563,
      },
      successed: rspOfVehicleList,
      failed: failedVehicleList,
    });
  }, [setVehiclesOfMap]);

  return <GcootersLayout />;
};

export default GcootersContainer;

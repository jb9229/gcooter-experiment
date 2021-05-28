import React from 'react';
import { useSetRecoilState } from 'recoil';
import { GET_VEHICLE_LIST_IN_BOUND, VehicleResponse } from '../../utils/sample';
import GcootersLayout from './GcootersLayout';
import { vehiclesOfMap } from './store';

const GcootersContainer: React.FC = () => {
  //states
  const setVehiclesOfMap = useSetRecoilState(vehiclesOfMap);

  const rspOfVehicleList = (rsp: VehicleResponse) => {
    console.log('success vehicle list call: ', rsp.data.length);

    // console.log('success vehicle list call: ', data);
    const vehicles = rsp.data;

    setVehiclesOfMap(rsp.data);
  };

  const failedVehicleList = () => {
    console.log('failed vehicle list call!!');
  };

  const location = {
    latitude: 37.62353703396386,
    longitude: 127.06104452210563,
  };

  const result = GET_VEHICLE_LIST_IN_BOUND({
    location: location,
    successed: rspOfVehicleList,
    failed: failedVehicleList,
  });

  return <GcootersLayout />;
};

export default GcootersContainer;

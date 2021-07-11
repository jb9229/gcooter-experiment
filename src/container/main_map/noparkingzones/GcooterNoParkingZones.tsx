import React from 'react';
import { Polygon } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { getNoParkingZoneQuery } from './store';

const GcooterNoParkingZones: React.FC = () => {
  const noParkingZones = useRecoilValue(getNoParkingZoneQuery);

  return (
    <>
      {noParkingZones.map((polygon, index) => (
        <Polygon
          key={`KEY_${index}`}
          coordinates={polygon.zone}
          // holes={holes}
          strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={1}
        />
      ))}
    </>
  );
};

export default GcooterNoParkingZones;

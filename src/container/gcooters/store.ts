import { atom } from 'recoil';
import { VehicleLocation } from 'utils/sample';

export const vehiclesOfMap = atom<VehicleLocation[]>({
  key: 'vehiclesOfMap',
  default: [],
});

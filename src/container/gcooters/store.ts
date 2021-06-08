import { atom } from 'recoil';
import { VehicleLocation } from 'utils/sample';

export const selectedMarkerState = atom<{ id: string | undefined }>({
  key: 'selectedMarkerState',
  default: { id: undefined },
});

export const vehiclesOfMap = atom<VehicleLocation[]>({
  key: 'vehiclesOfMap',
  default: [],
});

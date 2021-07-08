import { selector } from 'recoil';
import { GET_NO_PARKING_ZONE_IN_COORDS } from 'utils/sample';

export const getNoParkingZoneQuery = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const bounds = {
      max_lat: 37.625,
      max_lng: 127.025,
      min_lat: 37.5250000006,
      min_lng: 126.9250000001,
    };

    const response = await GET_NO_PARKING_ZONE_IN_COORDS({
      bounds,
    });

    return response;
  },
});

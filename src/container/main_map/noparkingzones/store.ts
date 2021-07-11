import { selector } from 'recoil';
import { GET_NO_PARKING_ZONE_IN_COORDS, LatLng } from 'utils/sample';

export interface NoParkingZoneResponse {
  id: number;
  northeast_lat: number;
  northeast_lng: number;
  southwest_lat: number;
  southwest_lng: number;
  bounds: string;
}

export interface NoParkingZone {
  id: number;
  zone: LatLng[];
}

export const getNoParkingZoneQuery = selector<Array<NoParkingZone>>({
  key: 'getNoParkingZoneQuery',
  get: async () => {
    const bounds = {
      max_lat: 37.625,
      max_lng: 127.025,
      min_lat: 37.5250000006,
      min_lng: 126.9250000001,
    };

    const response = await GET_NO_PARKING_ZONE_IN_COORDS({
      bounds,
    });

    return response.data.map((npZone) => {
      const boundsArr = JSON.parse(npZone.bounds);

      return {
        id: npZone.id,
        zone: boundsArr.map((latlng: any) => {
          return { longitude: latlng[0], latitude: latlng[1] } as LatLng;
        }),
      } as NoParkingZone;
    });
  },
});

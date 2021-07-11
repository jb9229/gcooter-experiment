export interface NoParkingResponse {
  data: NoParkingZone[];
}

export interface NoParkingZone {
  bounds: string;
  id: number;
  northeast_lat: number;
  northeast_lng: number;
  region_name: string;
  southwest_lat: number;
  southwest_lng: number;
}

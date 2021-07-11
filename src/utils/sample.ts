import { ApiError } from 'api/ApiError';
import { ApiResponse } from 'api/types';
import axios from 'axios';
import * as geolib from 'geolib';
import { NoParkingZoneResponse } from '~/container/main_map/noparkingzones/store';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface LatLngStr {
  lat: string;
  lng: string;
}

export interface developerMessage {
  code: string;
  message: string;
}

// Location, Riding API에 쓰고 있어서 공통으로 빼냄
export interface VehicleLocation extends LatLngStr {
  id: number;
  parking_image: string;
  scooter_number: string;
  region_name: string;
  is_activated: boolean;
  battery: number;
  type: 'scooter' | 'discount_spot' | 'gstore_spot';
  description: string;
  title: string;
  banner_images: string[];
  logo: string;
  parking_zone_info: {
    type: string;
    value: string;
    images: string[];
  };
  infos: {
    hours: {
      default: string;
      other: string;
    }[];
    urls: {
      url: string;
      text: string;
      type: string;
    }[];
  };
  coupons: {
    id: number;
    title: string;
    description: string;
    issue_ended_time: number;
    end_time: number;
  }[];
  gstation_id: number;
}

export interface VehicleResponse {
  check_license: boolean;
  license_check_info: {
    // 해당 위치의 운전면허 검사 여부
    license_allow: number; // 운전면허 검사 여부 ()
    no_license_speed_limit: number; // 운전면허가 없을때 현재 위치의 제한 속도
  };
  data: VehicleLocation[];
}

export function getValidObject(target: any, ...params: any[]): any {
  let object = target;

  if (isValidObject(target))
    if (
      params.every((param: string) => {
        if (typeof param === 'number')
          if (object.length > param) object = object[param];
          else object = undefined;
        else object = object[param];

        return isValidObject(object);
      })
    )
      return object;

  return undefined;
}

export function isValidString(object: any): any {
  return (
    object !== undefined &&
    object !== null &&
    typeof object === 'string' &&
    object.length > 0
  );
}

export function isValidObject(object: any): any {
  if (object !== undefined && object !== null) return true;

  return false;
}

export function isValidObjects(object: any, ...params: any[]): any {
  return isValidObject(getValidObject(object, ...params));
}

export function isValidArray(object: any): any {
  return (
    object !== undefined &&
    isValidObjects(object, 'length') &&
    object.length > 0
  );
}

export const ERROR_CODE = {
  UNKNOWN: 10000,
  TIMEOUT: 10001,
  INVALID_DATA: 10002,
  NO_ORDER_ID: 10003,
  INVALID_ORDER_ID: 10004,
  NOT_LOGGED_IN: 10005,
  AWS_UPLOAD_FAILED: 10006,
  KAKAO_API_ERROR: 10007,
  NO_FCM_TOKEN: 10008,
  INVALID_LOCATION: 10009,
  NOT_CONNECT_INTERNET: 10010,
  NOT_CONNECT_INTERNET_NOT_SHOW: 10011,
  NO_API_FUNCTION: 10012,
};

export const axiosInstance = axios.create({
  // baseURL: API_BASE_URL(),
  timeout: 30000,
  // validateStatus: function() {
  //   return true;
  // },
});
export async function GetRequest({
  // baseURL = API_BASE_URL(),
  endPoint,
  params,
  useToken,
  timeout = 30000,
}: {
  baseURL?: string;
  endPoint: string;
  params?: any;
  useToken?: boolean;
  timeout?: number;
}): Promise<ApiResponse> {
  const isValidParams = isValidObject(params);
  let getParamString = '';

  if (isValidParams)
    Object.keys(params).forEach((key: string, index: number) => {
      getParamString = getParamString.concat(
        `${index === 0 ? '?' : '&'}${key}=${params[key]}`
      );
    });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  // 토큰을 사용하는 API
  headers.adminid = 1228;
  headers.sign = 'adf6054da34bfb6f335fc9f6929f6bdf';

  return axiosInstance
    .get(endPoint + getParamString, {
      // baseURL,
      timeout,
      headers,
    })
    .then((response) => {
      const data = getValidObject(response, 'data');

      if (getValidObject(data, 'result_code') === 0) {
        const successedData = getValidObject(data, 'response');

        if (isValidObject(successedData)) return successedData;
        else {
          console.log('error 1');
          throw new ApiError(ERROR_CODE.INVALID_DATA, 'Invalid Data');
        }
      } else {
        console.log('error 1-1');
        throw new ApiError(
          getValidObject(data, 'result_code'),
          getValidObject(data, 'message'),
          getValidObject(data, 'developer_message')
        );
      }
    })
    .catch((reason) => {
      const message: string = getValidObject(reason, 'message');

      if (
        getValidObject(reason, 'code') === 'ECONNABORTED' &&
        isValidString(message) &&
        message.indexOf('timeout of') === 0
      ) {
        console.log('error 2');
        throw new ApiError(ERROR_CODE.TIMEOUT, `Time out : ${timeout}`);
      } else {
        console.log(`error 3: ${message}`);
        throw new ApiError(ERROR_CODE.UNKNOWN, message);
      }
    });
}

// [x] 범위 내 Vehicle 리스트
export async function GET_VEHICLE_LIST_IN_BOUND({
  location,
  radius = 2000,
}: {
  location: LatLng;
  radius?: number;
}): Promise<ApiResponse> {
  // [TODO] V2 개발 아직 안되었음
  const functionName = 'GET_VEHICLE_LIST_IN_BOUND';
  const RequestFunction = GetRequest;
  const endPoint = 'https://pre.api.gbike-api.com/api/v1/locations/scooters';

  const bounds = geolib.getBoundsOfDistance(location, radius);

  return RequestFunction({
    endPoint,
    params: isValidArray(bounds)
      ? {
          min_lng: bounds[0].longitude,
          min_lat: bounds[0].latitude,
          max_lng: bounds[1].longitude,
          max_lat: bounds[1].latitude,
        }
      : undefined,
  });
}

// 범위내 주차금지 구역 조회
export async function GET_NO_PARKING_ZONE_IN_COORDS({
  bounds,
}: {
  bounds: any;
  // successed: (data: NoParkingResponse) => void;
  // failed: (errCode: number, message: string) => void;
}): Promise<ApiResponse<Array<NoParkingZoneResponse>>> {
  // [TODO] V2 개발 아직 안되었음
  const functionName = 'GET_NO_PARKING_ZONE_IN_COORDS';
  const RequestFunction = GetRequest;
  const endPoint = 'https://pre.api.gbike-api.com/api/v2/locations/no-parking-zones';

  // const { RequestFunction, endPoint } = await GetAPIServerInfo(
  //   functionName,
  //   failed
  // );

  // ConsoleLog('bounds = ', bounds);

  return RequestFunction({
    endPoint,
    params: bounds,
  });
}

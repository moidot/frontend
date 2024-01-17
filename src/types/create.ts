import { ResponseDto } from './common';

export interface GetKakaoLocationSearchData {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: '';
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
export interface PostGroupData {
  name: string;
  date: string;
  userName: string;
  locationName: string;
  latitude: number;
  longitude: number;
  transportationType: 'PUBLIC' | 'PRIVATE';
  password: string;
}

export interface PostGroupResInterface {
  groupId: number;
  adminId: number;
  name: string;
  date: string;
  fixedPlace: 'none';
}
export interface GetKakaoLocationSearchRes {
  documents: GetKakaoLocationSearchData[];
}

export type PostGroupReq = PostGroupData;
export type PostGroupRes = ResponseDto<PostGroupResInterface>;

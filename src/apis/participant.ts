import { AxiosRequestConfig } from 'axios';
import customedAxios from './customedAxios';

interface UserInfoProps {
  participateId: string;
  userName: string;
  locationName: string;
  latitude: number;
  longitude: number;
  transportationType: string;
}

// 전체 스페이스 참여자 목록 조회
export const getAllParticipantList = async (groupId: number) => {
  const { data } = await customedAxios.get('/group', { params: { groupId: groupId } });
  return data;
};

// 스페이스 나가기(모임원)
export const deleteParticipant = async (participateId: number) => {
  const requestConfig: AxiosRequestConfig = {};
  requestConfig.data = { participateId: participateId };
  const { data } = await customedAxios.delete('/group/participate', requestConfig);
  return data;
};

// 스페이스 삭제(모임장)
export const deleteSpace = async (groupId: number) => {
  const requestConfig: AxiosRequestConfig = {};
  requestConfig.data = { groupId: groupId };
  const { data } = await customedAxios.delete('/group', requestConfig);
  return data;
};

// 모임원 내보내기(모임장 권한)
export const exitParticipant = async (participateId: number) => {
  const requestConfig: AxiosRequestConfig = {};
  requestConfig.data = { participateId: participateId };
  const { data } = await customedAxios.delete('/group/participate/removal', requestConfig);
  return data;
};

// 유저 정보 수정 API
export const updateUserInfo = async ({
  participateId,
  userName,
  locationName,
  latitude,
  longitude,
  transportationType,
}: UserInfoProps) => {
  const requestConfig: AxiosRequestConfig = {};
  requestConfig.data = {
    participationId: participateId,
    userName: userName,
    locationName: locationName,
    latitude: latitude,
    longitude: longitude,
    transportationType: transportationType,
  };
  const { data } = await customedAxios.patch('/group/participate/removal', requestConfig);
  return data;
};

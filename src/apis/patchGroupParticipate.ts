//스페이스 나가기 API
import { MyInfoData } from '@/types/MyInfoType';
import customedAxios from './customedAxios';

export const patchGroupParticipate = async (token: string, data: MyInfoData) => {
  try {
    const res = await customedAxios.delete('/group/participate', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        participateId: data.participateId,
        userName: data.userName,
        locationName: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        transportationType: data.transportationType,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

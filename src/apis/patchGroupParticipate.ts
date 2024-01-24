//내 참여 정보 수정 API
import { MyInfoData } from '@/types/MyInfoType';
import customedAxios from './customedAxios';

export const patchGroupParticipate = async (token: string, data: MyInfoData) => {
  try {
    const res = await customedAxios.patch(
      '/group/participate',
      {
        participateId: data.participateId,
        userName: data.userName,
        locationName: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        transportationType: data.transportationType,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

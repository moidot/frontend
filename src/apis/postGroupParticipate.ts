//스페이스 참여 API

import { PostGroupParticipateReq, PostGroupParticipateRes } from '@/types/invite';
import customedAxios from './customedAxios';

export const postGroupParticipate = async (
  token: string,
  data: PostGroupParticipateReq,
): Promise<PostGroupParticipateRes> => {
  try {
    const res = await customedAxios.post(
      `/group/participate`,
      {
        groupId: data.groupId,
        userName: data.userName,
        locationName: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        transportationType: data.transportationType,
        password: data.password,
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

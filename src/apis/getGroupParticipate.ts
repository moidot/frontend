// 내가 참여하고 있는 스페이스 조회 API
import { GetUserParticipateListRes } from '@/types/SpaceType';
import customedAxios from './customedAxios';

export const getGroupParticipate = async (token: string): Promise<GetUserParticipateListRes> => {
  try {
    const res = await customedAxios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/participate`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

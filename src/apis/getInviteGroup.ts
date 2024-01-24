import { GetAllParticipationRes } from '@/types/ParticipateType';
import customedAxios from './customedAxios';

// token 없이 getGroup 호출 시 사용하는 API - 로그인 전
export const getInviteGroup = async (groupId: number): Promise<GetAllParticipationRes> => {
  try {
    const res = await customedAxios.get('/group', {
      params: { groupId: groupId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

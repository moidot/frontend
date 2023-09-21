import { GetAllParticipationRes } from '@/types/ParticipateType';
import customedAxios from './customedAxios';

//스페이스 전체 참여자 조회 API
export const getGroup = async (token: string, groupId: number): Promise<GetAllParticipationRes> => {
  try {
    const res = await customedAxios.get('/group', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: { groupId: groupId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

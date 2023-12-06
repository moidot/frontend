// 투표 현황 조회 API
import customedAxios from './customedAxios';

export const getGroupVote = async (token: string, groupId: number) => {
  try {
    const res = await customedAxios.get(`/group/${groupId}/vote`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

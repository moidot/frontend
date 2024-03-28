// 투표 현황 조회 API
import customedAxios from './customedAxios';

export const getGroupVote = async (groupId: number, userId: number) => {
  try {
    const res = await customedAxios.get(`/group/${groupId}/vote`, {
      params: { user: userId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

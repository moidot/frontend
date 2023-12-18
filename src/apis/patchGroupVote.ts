//투표 종료하기 API
import customedAxios from './customedAxios';

export const patchGroupVote = async (token: string, groupId: number) => {
  try {
    const res = await customedAxios.patch(`/group/${groupId}/vote`, null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        groupId: groupId,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

import customedAxios from './customedAxios';

export interface VoteSelectProps {
  groupId: number;
  bestPlaceId: number;
}

//장소에 투표한 인원 조회 API
export const getVoteSelect = async (token: string, data: VoteSelectProps) => {
  try {
    const res = await customedAxios.get(`/group/${data.groupId}/vote/select`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: { groupId: data.groupId, bestPlaceId: data.bestPlaceId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

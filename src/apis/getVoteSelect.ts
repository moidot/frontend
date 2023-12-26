import { ResponseDto } from '@/types/common';
import customedAxios from './customedAxios';

export interface VoteSelectProps {
  groupId: number;
  bestPlaceId: number;
}

export type GetVoteSelectPeopleRes = ResponseDto<VoteSelectProps>;

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
    console.log('장소 투표 인원 현황 조회 API error, ', error);
    throw error;
  }
};

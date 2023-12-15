//투표 참여 API
import { ResponseDto } from '@/types/common';
import customedAxios from './customedAxios';

export interface VoteSelectData {
  groupId: number;
  bestPlaceIds: any;
}

export type GetVoteSelectRes = ResponseDto<VoteSelectData>;

export const postGroupVoteSelect = async (token: string, data: VoteSelectData): Promise<GetVoteSelectRes> => {
  try {
    console.log(data.bestPlaceIds, 'votepppppdata');
    const res = await customedAxios.post(
      `/group/${data.groupId}/vote/select`,
      {
        bestPlaceIds: data.bestPlaceIds,
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

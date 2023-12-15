//투표 시작 API
import { ResponseDto } from '@/types/common';
import customedAxios from './customedAxios';

export interface VoteStartData {
  groupId: number;
  isAnonymous: boolean;
  isEnabledMultipleChoice: boolean;
  endAt: string;
}

export type GetVoteStartRes = ResponseDto<VoteStartData>;

export const postGroupVote = async (token: string, data: VoteStartData): Promise<GetVoteStartRes> => {
  try {
    const res = await customedAxios.post(
      `/group/${data.groupId}/vote`,
      {
        isAnonymous: data.isAnonymous,
        isEnabledMultipleChoice: data.isEnabledMultipleChoice,
        endAt: data.endAt,
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

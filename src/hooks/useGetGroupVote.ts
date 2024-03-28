import { getGroupVote } from '@/apis/getGroupVote';
import { GetVoteRes } from '@/types/VoteType';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupVote = (groupId: number, userId: number = 0) => {
  return useQuery<GetVoteRes>(['get-group-vote'], () => getGroupVote(groupId, userId));
};

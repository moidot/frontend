import { getGroupVote } from '@/apis/getGroupVote';
import { GetVoteRes } from '@/types/VoteType';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupVote = (token: string, groupId: number) => {
  return useQuery<GetVoteRes>(['get-group-vote'], () => getGroupVote(token, groupId));
};

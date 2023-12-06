import { VoteSelectProps, getVoteSelect } from '@/apis/getVoteSelect';
import { GetVoteSelectRes } from '@/apis/postGroupVoteSelect';
import { useQuery } from '@tanstack/react-query';

export const useGetVoteSelect = (token: string, data: VoteSelectProps) => {
  return useQuery<GetVoteSelectRes>(['get-vote-select'], () => getVoteSelect(token, data));
};

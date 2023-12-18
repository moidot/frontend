import { GetVoteSelectPeopleRes, VoteSelectProps, getVoteSelect } from '@/apis/getVoteSelect';
import { useQuery } from '@tanstack/react-query';

export const useGetVoteSelect = (token: string, data: VoteSelectProps) => {
  return useQuery<GetVoteSelectPeopleRes>(['get-vote-select'], () => getVoteSelect(token, data));
};

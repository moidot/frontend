import { getGroupParticipate } from '@/apis/getGroupParticipate';
import { useQuery } from '@tanstack/react-query';
import { GetUserParticipateListRes } from '@/types/SpaceType';
export const useGetParticipate = (token: string) => {
  return useQuery<GetUserParticipateListRes>(['kakaoLogin'], () => getGroupParticipate(token), {
    staleTime: 300 * 1000,
  });
};

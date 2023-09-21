import { getGroup } from '@/apis/getGroup';
import { GetAllParticipationRes } from '@/types/ParticipateType';
import { useQuery } from '@tanstack/react-query';

export const useGetGroup = (token: string, groupId: number) => {
  return useQuery<GetAllParticipationRes>(['get-all-participant'], () => getGroup(token, groupId));
};

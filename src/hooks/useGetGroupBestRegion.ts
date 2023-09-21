import { useQuery } from '@tanstack/react-query';
import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import { getGroupBestRegion } from '@/apis/getGroupBestRegion';
export const useGetGroupBestRegion = (token: string, groupId: number) => {
  return useQuery<GetGroupBestRegionListRes>(['useGetGroupBestRegion'], () => getGroupBestRegion(token, groupId), {
    staleTime: 300 * 1000,
  });
};

import { useQuery } from '@tanstack/react-query';
import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import { getGroupBestRegion } from '@/apis/getGroupBestRegion';
export const useGetGroupBestRegion = (groupId: number) => {
  return useQuery<GetGroupBestRegionListRes>(['useGetGroupBestRegion'], () => getGroupBestRegion(groupId), {
    staleTime: 300 * 1000,
  });
};

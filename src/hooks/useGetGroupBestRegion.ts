import { useQuery } from '@tanstack/react-query';
import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import { getGroupBestRegion } from '@/apis/getGroupBestRegion';
export const useGetGroupBestRegion = (token: string) => {
  return useQuery<GetGroupBestRegionListRes>(['useGetGroupBestRegion'], () => getGroupBestRegion(token), {
    staleTime: 300 * 1000,
  });
};

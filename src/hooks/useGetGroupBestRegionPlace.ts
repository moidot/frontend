import { KeywordType, getGroupBestRegionPlace } from '@/apis/getGroupBestRegionPlace';
import { GetGroupBestRegionPlaceRes } from '@/types/SpaceType';

import { useQuery } from '@tanstack/react-query';

export const useGetGroupBestRegionPlace = (x: string, y: string, local: string, keyword: KeywordType) => {
  return useQuery<GetGroupBestRegionPlaceRes>(
    ['useGetGroupBestRegionPlace', local, keyword],
    () => getGroupBestRegionPlace(x, y, local, keyword),
    {
      enabled: !!local,
    },
    // {
    //   staleTime: 300 * 1000,
    // },
  );
};

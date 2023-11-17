import { KeywordType, getGroupBestRegionPlace } from '@/apis/getGroupBestRegionPlace';
import { GetGroupBestRegionPlaceRes } from '@/types/SpaceType';

import { useQuery } from '@tanstack/react-query';

export const useGetGroupBestRegionPlace = (
  token: string,
  x: string,
  y: string,
  local: string,
  keyword: KeywordType,
) => {
  return useQuery<GetGroupBestRegionPlaceRes>(
    ['useGetGroupBestRegionPlace', keyword],
    () => getGroupBestRegionPlace(token, x, y, local, keyword),
    {
      staleTime: 300 * 1000,
    },
  );
};

import { useQuery } from '@tanstack/react-query';

import { GetKakaoLocationSearchRes } from '@/types/create';
import { getKakaoSearchLocaton } from '@/apis/getKakaoSearchLocation';
export const useGetKakaoSearchLocation = (query: string) => {
  return useQuery<GetKakaoLocationSearchRes>(['useGetKakaoSearchLocation'], () => getKakaoSearchLocaton(query), {
    staleTime: 300 * 1000,
  });
};

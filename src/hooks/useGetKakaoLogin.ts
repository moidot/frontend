import { getKakaoLogin } from '@/apis/getAuthSigninKakao';
import { GetLoginRes } from '@/types/LoginType';
import { useQuery } from '@tanstack/react-query';

export const useGetKakaoLogin = (codeParam: string) => {
  return useQuery<GetLoginRes>(['kakaoLogin'], () => getKakaoLogin(codeParam), { staleTime: 300 * 1000 });
};

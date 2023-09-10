import { GetLoginRes } from '@/types/LoginType';
import customedAxios from './customedAxios';

export const getKakaoLogin = async (codeParam: string): Promise<GetLoginRes> => {
  try {
    console.log(codeParam);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin?code=${codeParam}&platform=KAKAO`;
    console.log(url);
    return (await customedAxios.get(url)).data;
  } catch (error) {
    throw error;
  }
};

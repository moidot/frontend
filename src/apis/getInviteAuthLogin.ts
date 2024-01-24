import customedAxios from './customedAxios';
import { GetLoginRes } from '@/types/LoginType';

export const getInviteAuthLogin = async (codeParam: string, platform: string): Promise<GetLoginRes> => {
  try {
    console.log(codeParam);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin?code=${codeParam}&platform=${platform}`;
    console.log(url);
    return (await customedAxios.get(url)).data;
  } catch (error) {
    throw error;
  }
};
export default getInviteAuthLogin;

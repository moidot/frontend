import { GetKakaoLocationSearchRes } from '@/types/create';
import axios from 'axios';

export const getKakaoSearchLocaton = async (locationQuery: string): Promise<GetKakaoLocationSearchRes> => {
  try {
    const res = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword?query=${locationQuery}`, {
      params: { query: locationQuery },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_APT_KEY} `,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

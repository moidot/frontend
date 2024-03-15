// 내가 참여하고 있는 스페이스 조회 API
import { GetGroupBestRegionPlaceRes } from '@/types/SpaceType';
import customedAxios from './customedAxios';

export type KeywordType = '카페' | '스터디카페' | '식당' | '도서관' | '스터디룸';

export const getGroupBestRegionPlace = async (
  token: string,
  x: string,
  y: string,
  local: string,
  keyword: KeywordType,
): Promise<GetGroupBestRegionPlaceRes> => {
  try {
    console.log('추천 장소 정보: ', x, y, local, keyword);
    const res = await customedAxios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group/best-region/place?x=${x}&y=${y}&local=${local}&keyword=${keyword}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

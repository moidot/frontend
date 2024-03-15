import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import customedAxios from './customedAxios';

export const getGroupBestRegion = async (groupId: number): Promise<GetGroupBestRegionListRes> => {
  try {
    const res = await customedAxios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/best-region?groupId=${groupId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

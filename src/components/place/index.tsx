import { userNavAtom } from '@/states/userNavAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { NAV_LIST } from '../common/navbar/Navigation';
import ShareButton from '../common/button/share';
import KakaoMap from './KakaoMap';
import { useGetGroupBestRegion } from '@/hooks/useGetGroupBestRegion';
import api from '@/services/TokenService';
import AdminBox from '../common/main/AdminBox';
import OthersBox from '../common/main/OthersBox';

const Place = () => {
  const setUserAtom = useSetRecoilState(userNavAtom);
  setUserAtom({ activeNavType: NAV_LIST.PLACE });
  const token = api.getToken();

  const { data: bestRegionData } = useGetGroupBestRegion(token);
  // data의 0번째를 그룹장이라 생각
  const admin = bestRegionData?.data[0];
  const length = bestRegionData?.data.length;
  const othersData = bestRegionData?.data;

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="flex flex-col justify-center items-center p-4 mt-10">
        <div className="font-Pretendard text-black text-h1 font-bold">모이닷 팀 프로젝트</div>
        <div className="font-Pretendard text-font_gray text-h3 font-bold">2023.12.01</div>
      </div>
      <div className="p-10">
        <ShareButton />
      </div>
      <KakaoMap />
      <div className="grid grid-cols-2 w-[100%]  p-10 gap-[20px]">
        <AdminBox name="정민" time={68} money="12" transportType="SUBWAY" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
      </div>
    </div>
  );
};
export default Place;

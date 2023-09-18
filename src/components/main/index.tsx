import { userNavAtom } from '@/states/userNavAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { NAV_LIST } from '../common/navbar/Navigation';
import ShareButton from '../common/button/share';
import KakaoMap from './KakaoMap';
import Recommendation from './Recommendation';

const Main = () => {
  const setUserAtom = useSetRecoilState(userNavAtom);
  setUserAtom({ activeNavType: NAV_LIST.MAIN });

  // data의 0번째를 그룹장이라 생각

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

      <Recommendation />
    </div>
  );
};
export default Main;

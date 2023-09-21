import { userNavAtom } from '@/states/userNavAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { NAV_LIST } from '../common/navbar/Navigation';
import ShareButton from '../common/button/share';
import Recommendation from './Recommendation';
import Place from '../place';
import { useRouter } from 'next/router';
import { useGetGroupBestRegion } from '@/hooks/useGetGroupBestRegion';
import api from '@/services/TokenService';
import { useGetGroup } from '@/hooks/useGetGroup';
import KakaoMap from './KakaoMap';
const Main = () => {
  const token = api.getToken();
  const setUserAtom = useSetRecoilState(userNavAtom);
  setUserAtom({ activeNavType: NAV_LIST.MAIN });
  const router = useRouter();
  const { query } = router;
  console.log(query);
  //url의 파라미터에서 groupId추출하기
  const groupId = parseInt(query.id as string);
  const { data: groupData, isLoading } = useGetGroupBestRegion(token, groupId);
  const { data: groupNameData } = useGetGroup(token, groupId);

  // 위도,경도 전역 상태로 관리
  return (
    <>
      {isLoading ? (
        <>
          <h1>로딩중</h1>
        </>
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-col justify-center items-center p-4 mt-10">
            <div className="font-Pretendard text-black text-h1 font-bold">{groupNameData?.data.name}</div>
            <div className="font-Pretendard text-font_gray text-h3 font-bold">{groupNameData?.data.date}</div>
          </div>
          <div className="p-10">
            <ShareButton />
          </div>

          <KakaoMap
            lat={parseFloat(groupData?.data[0].latitude.toString() as string)}
            lng={parseFloat(groupData?.data[0].longitude.toString() as string)}
          />
          {groupData ? (
            <Recommendation code={groupData.code} message={groupData.message} data={groupData.data} />
          ) : (
            <div>데이터를 불러올 수 없습니다</div>
          )}
          <div className="w-full h-full bg-light_orange p-8">
            <Place />
          </div>
        </div>
      )}
    </>
  );
};
export default Main;

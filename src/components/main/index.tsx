import { userNavAtom } from '@/states/userNavAtom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NAV_LIST } from '../common/navbar/Navigation';
import ShareButton from '../common/button/share';
import Recommendation from './Recommendation';
import Place from '../place';
import { useGetGroupBestRegion } from '@/hooks/useGetGroupBestRegion';
import api from '@/services/TokenService';
import { useGetGroup } from '@/hooks/useGetGroup';
import KakaoMap from './KakaoMap';
import { groupIdAtom } from '@/states/groupIdAtom';
import LoadingPage from '@/pages/loading';
import { recommendIndexAtom } from '@/states/recommendIndexAtom';

interface MainProps {
  id: string;
}

const Main = ({ id }: MainProps) => {
  const userId = api.getId();
  const setGroupId = useSetRecoilState(groupIdAtom);
  setGroupId({
    groupId: parseInt(id),
  });
  // 새로고침 test => let 변수 state로 관리(해결중)
  // let lat = 0;
  // let lng = 0;
  // let local = '';
  // // 현재 로그인된 유저의 path
  // const userPath = groupData?.data[0].moveUserInfo.filter((item: any) => item.userId === userId);
  // // 유저 이외의 사람들의 path
  // const otherUserPath = groupData?.data[0].moveUserInfo.filter((item: any) => item.userId != userId);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [local, setLocal] = useState<any>(null);
  const [userPath, setUserPath] = useState<any>([]);
  const [otherUserPath, setOtherUserPath] = useState<any>([]);

  const setUserAtom = useSetRecoilState(userNavAtom);
  setUserAtom({ activeNavType: NAV_LIST.MAIN });
  const recommendIndex = useRecoilValue(recommendIndexAtom);
  const [groupData, setGroupData] = useState<any>();
  const [groupNameData, setGroupNameData] = useState<any>();

  const { data: gData } = useGetGroupBestRegion(parseInt(id));
  const { data: gNameData } = useGetGroup(parseInt(id));
  // 0번째 추천 지역 대상으로 lat,lng 추출

  useEffect(() => {
    console.log(gData, 'gData');
    groupData !== gData && setGroupData(gData);
  }, [gData, groupData]);

  useEffect(() => {
    if (groupData) {
      setLat(groupData?.data[recommendIndex].latitude);
      setLng(groupData?.data[recommendIndex].longitude);
      setLocal(groupData?.data[recommendIndex].name);
      setUserPath(groupData?.data[recommendIndex].moveUserInfo.filter((item: any) => item.userId === userId));
      setOtherUserPath(groupData?.data[recommendIndex].moveUserInfo.filter((item: any) => item.userId !== userId));
    }
  }, [groupData, recommendIndex, userId]);

  useEffect(() => {
    console.log(gNameData, 'gNameData');
    groupNameData !== gNameData && setGroupNameData(gNameData);
  }, [gNameData, groupNameData]);

  if (groupNameData) {
    sessionStorage.setItem('adminId', groupNameData?.data?.adminEmail);
  }

  // 위도,경도 전역 상태로 관리
  return (
    <>
      {groupData === undefined ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <div className="flex flex-col bg-white overflow-hidden">
          <div className="flex flex-col justify-center items-center p-2 tablets:p-4 mt-4 tablets:mt-10">
            <div className="font-Pretendard text-font_black text-mobile_h1 tablets:text-h1 font-bold">
              {groupNameData?.data.name}
            </div>
            <div className="font-Pretendard text-font_gray text-mobile_h3 tablets:text-h3 font-bold">
              {groupNameData?.data.date}
            </div>
          </div>
          <div className="p-4 tablets:p-10">
            <ShareButton teamname={groupNameData?.data.name} />
          </div>

          {userPath && otherUserPath && (
            <KakaoMap
              lat={parseFloat(groupData?.data[recommendIndex].latitude.toString() as string)}
              lng={parseFloat(groupData?.data[recommendIndex].longitude.toString() as string)}
              user={userPath}
              otherUser={otherUserPath}
            />
          )}

          {groupData ? (
            <Recommendation code={groupData.code} message={groupData.message} data={groupData.data} />
          ) : (
            <div>데이터를 불러올 수 없습니다</div>
          )}

          <div className="w-full h-full bg-light_orange p-8">
            {groupData ? (
              <Place lat={lat.toString()} lng={lng.toString()} local={local} />
            ) : (
              <div>데이터를 불러올 수 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;

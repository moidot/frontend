import { userNavAtom } from '@/states/userNavAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { NAV_LIST } from '../common/navbar/Navigation';
import ShareButton from '../common/button/share';
import Recommendation from './Recommendation';
import Place from '../place';
import { useGetGroupBestRegion } from '@/hooks/useGetGroupBestRegion';
import api from '@/services/TokenService';
import { useGetGroup } from '@/hooks/useGetGroup';
import KakaoMap from './KakaoMap';
import { groupIdAtom } from '@/states/groupIdAtom';
interface MainProps {
  id: string;
}

const Main = ({ id }: MainProps) => {
  const userId = api.getId();
  const token = api.getToken();
  const setGroupId = useSetRecoilState(groupIdAtom);
  setGroupId({
    groupId: parseInt(id),
  });

  let lat = 0;
  let lng = 0;
  let local = '';

  const setUserAtom = useSetRecoilState(userNavAtom);
  setUserAtom({ activeNavType: NAV_LIST.MAIN });

  const { data: groupData, isLoading } = useGetGroupBestRegion(token, parseInt(id));
  const { data: groupNameData } = useGetGroup(token, parseInt(id));
  // 0번째 추천 지역 대상으로 lat,lng 추출

  console.log(groupData);
  if (groupData) {
    lat = groupData?.data[0].latitude;
    lng = groupData?.data[0].longitude;
    local = groupData?.data[0].name;
  }

  // 현재 로그인된 유저의 path
  const userPath = groupData?.data[0].moveUserInfo.filter((item) => item.userId === userId);
  // 유저 이외의 사람들의 path
  const otherUserPath = groupData?.data[0].moveUserInfo.filter((item) => item.userId != userId);

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

          {userPath && otherUserPath ? (
            <KakaoMap
              lat={parseFloat(groupData?.data[0].latitude.toString() as string)}
              lng={parseFloat(groupData?.data[0].longitude.toString() as string)}
              user={userPath}
              otherUser={otherUserPath}
            />
          ) : null}

          {groupData ? (
            <Recommendation code={groupData.code} message={groupData.message} data={groupData.data} />
          ) : (
            <div>데이터를 불러올 수 없습니다</div>
          )}

          <div className="w-full h-full bg-light_orange p-8">
            <Place lat={lat.toString()} lng={lng.toString()} local={local} />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;

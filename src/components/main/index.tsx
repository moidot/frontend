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
import { useRouter } from 'next/router';
import KakaoMap from './KakaoMap';

interface MainProps {
  id: string;
}

const Main = ({ id }: MainProps) => {
  const router = useRouter();
  const userId = api.getId();
  const token = api.getToken();
  const setUserAtom = useSetRecoilState(userNavAtom);

  setUserAtom({ activeNavType: NAV_LIST.MAIN });

  console.log(router.query.id);
  const { data: groupData, isLoading } = useGetGroupBestRegion(token, parseInt(id));
  const { data: groupNameData } = useGetGroup(token, parseInt(id));
  console.log(groupData);
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
            <Place />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;

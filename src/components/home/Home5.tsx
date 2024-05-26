import EmptyState from '@assets/home/illust_empty_state.svg';
import api from '@/services/TokenService';
// import { useEffect, useState } from 'react';
import { useGetParticipate } from '@/hooks/useGetGroupParticipate';
import SpaceBox from '../common/home/SpaceBox';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DeletePopup from './DeletePopup';

const Home5 = () => {
  // const [emptySpaceState, setEmptySpaceState] = useState(true);
  const token = api.getToken();
  console.log(api.getToken());
  const { data, isLoading } = useGetParticipate(token);
  const [clickAuth, setClickAuth] = useState<boolean>(false);
  const router = useRouter();

  console.log(data);

  // useEffect(() => {
  //   if (data?.data.length !== undefined) {
  //     setEmptySpaceState(false);
  //   }
  // }, [data?.data.length]);
  const onBoxClick = (groupId: number) => {
    router.push({
      pathname: `/main/${groupId}`,
    });
  };

  const onAuthClick = () => {
    setClickAuth(!clickAuth);
  };
  return (
    <div className="w-full bg-light_orange mt-8 tablets:mt-24 mx-auto">
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="desktop:w-[80vw] xl:w-[65vw] mx-auto">
          <div className="flex flex-col justify-center items-center gap-5 desktop:gap-[60px]">
            <div className="flex flex-col justify-center items-center gap-[2px] mt-10">
              <div className="font-Pretendard text-black text-mobile_b1 tablets:text-h3 font-bold ">
                나의 모이닷 스페이스
              </div>
              <div className="font-Pretendard text-font_gray text-mobile_b3 tablets:text-b3 font-regular ">
                과거에 진행되었던 모임장소 조율이에요.
              </div>
            </div>
            {data && data?.data.length === 0 ? (
              <div>
                <EmptyState />
                <div className="flex flex-col justify-center items-center gap-[4px] mb-24">
                  <div className="font-Pretendard text-font_gray text-b3 font-regular ">모이닷 스페이스가 없어요.</div>
                  <div className="font-Pretendard text-font_gray text-b3 font-regular ">
                    모임원들과 장소조율을 시작해보세요!
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:grid lg:grid-cols-2 p-5 gap-8">
                {data?.data.map((item) => (
                  <div key={item.groupId} onClick={() => onBoxClick(item.groupId)}>
                    <SpaceBox
                      groupAdminName={item.groupAdminName}
                      groupDate={item.groupDate}
                      groupId={item.groupId}
                      groupName={item.groupName}
                      groupParticipates={item.groupParticipates}
                      bestPlaceNames={item.bestPlaceNames}
                      confirmPlace={item.confirmPlace}
                      participantNames={item.participantNames}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="font-Pretendard text-font_gray text-b3 font-regular underline mb-5" onClick={onAuthClick}>
              모이닷 탈퇴하기
            </div>
          </div>
        </div>
      )}
      {clickAuth && <DeletePopup onAuthClick={onAuthClick} />}
    </div>
  );
};
export default Home5;

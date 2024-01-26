import EmptyState from '@assets/home/illust_empty_state.svg';
import api from '@/services/TokenService';
import { useEffect, useState } from 'react';
import { useGetParticipate } from '@/hooks/useGetGroupParticipate';
import SpaceBox from '../common/home/SpaceBox';
import { useRouter } from 'next/router';

const Home5 = () => {
  // 유저가 공간을 만든적이 없으면 empty -> true, 그게 아니면 false
  const [emptySpaceState, setEmptySpaceState] = useState(true);
  const token = api.getToken();
  console.log(api.getToken());
  const { data, isLoading } = useGetParticipate(token);
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    if (data?.data.length != 0) {
      setEmptySpaceState(false);
    }
  }, [data?.data.length]);
  const onBoxClick = (groupId: number) => {
    router.push({
      pathname: `/main/${groupId}`,
    });
  };
  return (
    <div>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center gap-[60px] bg-light_orange w-screen mt-24">
            <div className="flex flex-col justify-center items-center gap-[2px] mt-10">
              <div className="font-Pretendard text-black text-h3 font-bold ">나의 모이닷 스페이스</div>
              <div className="font-Pretendard text-font_gray text-b3 font-regular ">
                과거에 진행되었던 모임장소 조율이에요.
              </div>
            </div>
            {emptySpaceState == true ? (
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
              <div className="grid grid-cols-2 w-100vw p-5 gap-8">
                {data?.data.map((item) => (
                  <div key={item.groupId} onClick={() => onBoxClick(item.groupId)}>
                    <SpaceBox
                      groupAdminName={item.groupAdminName}
                      groupDate={item.groupDate}
                      groupId={item.groupId}
                      groupName={item.groupName}
                      groupParticipates={item.groupParticipates}
                      bestPlaceName={item.bestPlaceName}
                      confirmPlace={item.confirmPlace}
                      participantNames={item.participantNames}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home5;

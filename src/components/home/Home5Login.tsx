import EmptyState from '@assets/home/illust_empty_state.svg';
import api from '@/services/TokenService';
import { useState } from 'react';
import { useGetParticipate } from '@/hooks/useGetGroupParticipate';
import ContentBox from '../common/contentBox/ContentBox';

const Home5Login = () => {
  // 유저가 공간을 만든적이 없으면 empty -> true, 그게 아니면 false
  const [emptySpaceState, setEmptySpaceState] = useState(true);
  const token = api.getToken();
  console.log(token);
  const response = useGetParticipate(token);
  if (response.data?.code == 400) {
    setEmptySpaceState(false);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-[60px] bg-light_orange w-screen mt-10 pt-10 pb-[200px]">
      <div className="flex flex-col justify-center items-center gap-[2px] mt-10">
        <div className="font-Pretendard text-black text-h3 font-bold ">나의 모이닷 스페이스</div>
        <div className="font-Pretendard text-font_gray text-b3 font-regular ">
          과거에 진행되었던 모임장소 조율이에요.
        </div>
      </div>
      {!emptySpaceState ? (
        <div>
          <EmptyState />
          <div className="flex flex-col justify-center items-center gap-[4px] mb-24">
            <div className="font-Pretendard text-font_gray text-h3 font-regular ">모이닷 스페이스가 없어요.</div>
            <div className="font-Pretendard text-font_gray text-b3 font-regular ">
              모임원들과 장소조율을 시작해보세요!
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-center items-center gap-[30px]">
            <ContentBox />
            <ContentBox />
          </div>
        </div>
      )}
    </div>
  );
};
export default Home5Login;

import UrlButton from '@/components/common/button/url';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteChoiceOption from '@/components/vote/VoteChoiceOption';
import VoteTitle from '@/components/vote/VoteTitle';
import VoteEndPopup from '@/components/vote/detail/VoteEndPopup';
import { useState } from 'react';
import VoteKakaoMap from '@/components/vote/detail/VoteKakaoMap';

const VoteDetailPage = () => {
  const [clickedStartBtn, setClickedStartBtn] = useState<boolean>(false);
  const [clickedAgainBtn, setClickedAgainBtn] = useState<boolean>(false);
  const [endVote, setEndVote] = useState<boolean>(false);
  return (
    <section className="font-Pretendard">
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <VoteTitle />
      <div className="w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <UrlButton />
      </div>
      {/* 지도 자리 */}
      {/* <div className="w-full border bg-icon_gray mb-[20px]"> */}
      <VoteKakaoMap lat={37.498085} lng={127.027621} />
      {/* <NewVoteMap /> */}
      {/* </div> */}
      {/* 투표 탭 */}
      <div className="w-[1200px] mx-auto">
        <div className="w-full h-[74px] mt-2 flex justify-between items-center">
          <div className="w-[170px] h-[50px] flex justify-between text-main_orange text-b3">
            <div>● 복수선택</div>
            <div>● 익명투표</div>
          </div>
          <div className="text-b2 text-font_gray">10월 7일 오후 3:00까지</div>
        </div>
        {/* 투표 창 */}
        <div className="w-[1168px] mx-auto" style={{ pointerEvents: clickedStartBtn ? 'auto' : 'none' }}>
          <VoteChoiceOption />
          <VoteChoiceOption />
          <VoteChoiceOption />
        </div>
        {clickedStartBtn ? (
          <div
            onClick={() => setClickedAgainBtn(!clickedAgainBtn)}
            // 다시 투표하기로 넘기기!!!
            className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center bg-main_orange rounded-2xl mx-auto mt-[60px] mb-[22px] text-white text-b2">
            {clickedAgainBtn ? '다시 투표하기' : '투표하기'}
          </div>
        ) : (
          <div
            onClick={() => setClickedStartBtn(!clickedStartBtn)}
            className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center border-2 bg-btn_disabled rounded-2xl mx-auto mt-[60px] mb-[22px] text-font_gray text-b2">
            투표하기
          </div>
        )}

        <div
          onClick={() => setEndVote(!endVote)}
          className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center border-2 border-main_orange rounded-2xl mx-auto mb-[150px] text-main_orange text-b2 box-border">
          투표 종료하기
        </div>
      </div>
      {endVote && <VoteEndPopup />}
    </section>
  );
};

export default VoteDetailPage;

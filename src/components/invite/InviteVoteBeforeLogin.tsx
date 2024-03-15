import VoteImg from '@assets/vote/icon_vote.svg';
import LoginPopup from './LoginPopup';
import { useState } from 'react';
import Header from '../common/header';
import Navbar from '../common/navbar';
import { NAV_LIST } from '../common/navbar/Navigation';

const InviteVoteBeforeLogin = () => {
  const [clickLogin, setClickLogin] = useState<boolean>(false);
  return (
    <div className="font-Pretendard text-center">
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <div className="text-h3 font-bold pt-20">모임 참여 후 투표가 가능해요!</div>
      <div className="text-b2 pt-2 pb-24 text-main_orange">로그인 후 투표 현황을 확인해보세요.</div>
      <VoteImg className="mx-auto" />
      <div
        className="flex items-center justify-center mx-auto w-[585px] h-[72px] bg-main_orange rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px] my-16 cursor-pointer"
        onClick={() => {
          setClickLogin(true);
        }}>
        <div className="text-center cursor-pointer text-white text-b2">모임 참여하기</div>
      </div>
      {clickLogin && <LoginPopup setClickLogin={setClickLogin} />}
    </div>
  );
};

export default InviteVoteBeforeLogin;

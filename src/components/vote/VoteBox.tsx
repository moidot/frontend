import api from '@/services/TokenService';
import VoteIcon from '@assets/vote/icon_before_vote.svg';
import UrlButton from '../common/button/url';

const VoteBox = ({ admin }: any) => {
  const currentUserEmail = api.getEmail();
  const leaderMent = '모두 정보를 입력하였다면 투표로 장소를 정할 수 있어요.\n투표를 시작할 준비, 되셨나요?';
  const memberMent =
    '모임장이 아직 투표를 시작하지 않았어요!\n투표가 시작되면 모이닷 스페이스 나가기 및 참여 정보 변경이 불가해요.';
  return (
    <div className="w-full h-[465px] bg-bg_orange mb-[30px]">
      <div className="pt-[32px]">
        <VoteIcon className="mx-auto" />
      </div>
      {currentUserEmail === admin ? <div className="h-[80px]"></div> : <div className="h-[20px]"></div>}
      <div className="text-main_orange text-b1 font-bold text-center whitespace-pre">
        {currentUserEmail === admin ? leaderMent : memberMent}
      </div>
      <div className="mt-[30px]">{currentUserEmail !== admin && <UrlButton />}</div>
    </div>
  );
};

export default VoteBox;

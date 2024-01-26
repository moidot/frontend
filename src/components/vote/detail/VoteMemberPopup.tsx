import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import { useGetVoteSelect } from '@/hooks/useGetVoteSelect';
import api from '@/services/TokenService';
import { groupAdminIdAtom } from '@/states/groupAdminIdAtom';
import { groupIdAtom } from '@/states/groupIdAtom';
import CloseBtn from '@assets/vote/icon_close_popup.svg';
import Master from '@assets/participate/icon_master.svg';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
const VoteMemberPopup = ({ placeName, bestPlaceId, setIsClickedPeopleIcon }: any) => {
  const [voteMemberArr, setVoteMemberArr] = useState<any>();
  const group = useRecoilValue(groupIdAtom);
  const admin = useRecoilValue(groupAdminIdAtom);
  const token = api.getToken();
  const userEmail = api.getEmail();
  const data = {
    groupId: group.groupId,
    bestPlaceId: bestPlaceId,
  };
  const response = useGetVoteSelect(token, data);
  useEffect(() => {
    if (response.data?.message === '성공') setVoteMemberArr(response.data?.data);
    console.log('user Email & admin Ema', userEmail, 'ddd', admin.adminId);
  }, [admin.adminId, response, userEmail]);
  return (
    <CommonPopupBackground>
      <div className="font-Pretendard relative">
        <div className="relative w-[790px] border mt-[35vh] mx-auto p-8 text-center rounded-2xl bg-white text-h3">
          <div className="absolute right-[56px]" onClick={() => setIsClickedPeopleIcon(false)}>
            <CloseBtn />
          </div>
          <span>
            <b>{placeName}</b>에 투표한 모임원
          </span>
          {voteMemberArr?.voteParticipations.length === 0 && (
            <div className="text-b1 mt-[20px]">투표한 모임원이 없어요.</div>
          )}
          <div>
            {voteMemberArr?.voteParticipations.map((item: any, idx: number) => (
              <div
                className="flex w-[585px] h-[100px] rounded-2xl items-center pl-4 mt-[45px] mx-auto text-b1 font-bold bg-disabled_orange"
                key={idx}>
                {userEmail === admin.adminId && <Master className="mr-2" />}
                {item.nickName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonPopupBackground>
  );
};

export default VoteMemberPopup;

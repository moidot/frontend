import VotePopup from '@/components/vote/VotePopup';
import VoteStartBtn from '@/components/vote/VoteStartBtn';
import VoteOptionBtn from '@/components/vote/setting/VoteOptionBtn';
import OrangeCalendar from '@assets/vote/icon_calendar_orange.svg';
import GrayCalendar from '@assets/vote/icon_calendar_gray.svg';
import { useEffect, useState } from 'react';
import VoteTimePicker from '@/components/vote/setting/VoteTimePicker';
import { useMutation } from '@tanstack/react-query';
import { VoteStartData, postGroupVote } from '@/apis/postGroupVote';
import api from '@/services/TokenService';
import { useRecoilValue } from 'recoil';
import { groupIdAtom } from '@/states/groupIdAtom';
import { handleDateFormat } from '@/utils/changeDateFormat';
import BackButtonBar from '@/components/common/backButtonBar';
import { useRouter } from 'next/router';
import { groupNameAtom } from '@/states/groupNameAtom';

const VoteSettingPage = () => {
  const [endTime, setEndTime] = useState<boolean>(false);
  const [duplicated, setDuplicated] = useState<boolean>(false);
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [voteEndDate, setVoteEndDate] = useState<any>('');
  const [voteEndAt, setVoteEndAt] = useState<any>('');
  const router = useRouter();
  const token = api.getToken();
  const groupIdValue = useRecoilValue(groupIdAtom);
  const groupNameValue = useRecoilValue(groupNameAtom);
  const voteData = {
    groupId: groupIdValue.groupId,
    isAnonymous: anonymous,
    isEnabledMultipleChoice: duplicated,
    endAt: voteEndAt,
  };

  useEffect(() => {
    const changeDate = handleDateFormat(voteEndAt);
    setVoteEndDate(changeDate);
  }, [voteEndAt]);

  const postGroupVoteMutation = useMutation((data: VoteStartData) => postGroupVote(token, data), {
    onSuccess: () => {
      console.log(`/vote/detail/${groupIdValue.groupId}`); // 내 모이닷 스페이스로 수정하기
    },
    onError: () => {
      console.log('투표 생성 error');
    },
  });

  const onBackClick = () => {
    router.push(`/vote/wait/${groupIdValue.groupId}`);
  };

  return (
    <section className="font-Pretendard">
      <BackButtonBar onClick={onBackClick} />
      <div className="my-[60px]">
        <div className="text-center">
          <div className="text-h2 font-bold text-font_black">투표로 장소를 확정해 보세요.</div>
          <div className="text-b1 text-font_gray">투표를 시작하면 모임원의 참여 정보 변경이 어려워요.</div>
        </div>
      </div>

      <VoteOptionBtn title="종료시간" option={endTime} setOption={setEndTime} />
      {endTime ? (
        <div
          onClick={() => setOpenPicker(!openPicker)}
          className="w-[586px] h-[72px] mx-auto mb-[90px] bg-bg_orange rounded-2xl px-6 flex justify-between items-center cursor-pointer">
          {voteEndAt === '' ? (
            <div className="text-b2 text-font_gray">종료시간을 선택해주세요.</div>
          ) : (
            <div className="text-b2 text-main_orange">{voteEndDate}</div>
          )}
          <OrangeCalendar />
        </div>
      ) : (
        <div className="w-[586px] h-[72px] mx-auto mb-[90px] bg-btn_disabled rounded-2xl px-6 flex justify-between items-center">
          <div className="text-b2 text-font_gray">종료시간을 선택해주세요.</div>
          <GrayCalendar />
        </div>
      )}
      <VoteOptionBtn title="복수선택" option={duplicated} setOption={setDuplicated} />
      <VoteOptionBtn title="익명투표" option={anonymous} setOption={setAnonymous} />
      <div
        className="mt-[100px]"
        onClick={() => {
          setSetting(!setting), postGroupVoteMutation.mutate(voteData);
        }}>
        <VoteStartBtn />
      </div>
      {setting && <VotePopup groupId={groupIdValue.groupId} groupName={groupNameValue} />}
      {openPicker && <VoteTimePicker setOpenPicker={setOpenPicker} setVoteEndAt={setVoteEndAt} />}
    </section>
  );
};

export default VoteSettingPage;

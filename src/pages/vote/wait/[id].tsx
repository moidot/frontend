import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteBox from '@/components/vote/VoteBox';
import VoteStartBtn from '@/components/vote/VoteStartBtn';
import VoteTitle from '@/components/vote/VoteTitle';
import { useGetGroup } from '@/hooks/useGetGroup';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { ParticipationProps } from '@/types/ParticipateType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const VoteWaitPage = ({ response }: any) => {
  const currentUserEmail = api.getEmail();
  const router = useRouter();
  const [groupData, setGroupData] = useState<ParticipationProps>();
  const [adminEmail, setAdminEmail] = useState<string | undefined>('');
  const group = useRecoilValue(groupIdAtom);
  const getGroup = useGetGroup(group.groupId);
  const [sumParticipant, setSumParticipant] = useState<number>(0);
  useEffect(() => {
    if (getGroup.data?.message === '성공') setGroupData(getGroup.data?.data);
    setAdminEmail(groupData?.adminEmail);
  }, [getGroup.data?.data, getGroup.data?.message, groupData?.adminEmail, response]);

  useEffect(() => {
    let count = 0;
    groupData?.participantsByRegion.map((item: any) => item.participations.map((i: any) => i && count++));
    setSumParticipant(count);
  }, [groupData?.participantsByRegion]);

  const handleClickVoteStartBtn = () => {
    if (sumParticipant < 2) {
      alert('투표 생성은 모임원이 2인 이상일 경우에만 가능합니다.');
    } else {
      router.push(`/vote/setting/${group.groupId}`);
    }
  };
  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        <div className="mb-[90px]">
          <VoteTitle groupName={response?.data?.groupName} groupDate={response?.data?.groupDate} />
        </div>
        <VoteBox admin={adminEmail} groupName={response?.data?.groupName} />
        <div onClick={handleClickVoteStartBtn}> {currentUserEmail === adminEmail && <VoteStartBtn />}</div>
      </div>
    </section>
  );
};

export default VoteWaitPage;

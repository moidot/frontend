import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteBox from '@/components/vote/VoteBox';
import VoteStartBtn from '@/components/vote/VoteStartBtn';
import VoteTitle from '@/components/vote/VoteTitle';
import { useGetGroup } from '@/hooks/useGetGroup';
import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { ParticipationProps } from '@/types/ParticipateType';
import { VoteData } from '@/types/VoteType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VotePage = () => {
  const currentUserEmail = api.getEmail();
  const router = useRouter();
  const token = api.getToken();
  const [voteData, setVoteData] = useState<VoteData>();
  const [groupData, setGroupData] = useState<ParticipationProps>();
  const [adminEmail, setAdminEmail] = useState<string | undefined>('');
  const response = useGetGroupVote(token, 22);
  const getGroup = useGetGroup(token, 22);
  useEffect(() => {
    if (response.data?.message === '성공') setVoteData(response.data?.data);
    if (getGroup.data?.message === '성공') setGroupData(getGroup.data?.data);
    setAdminEmail(groupData?.adminEmail);
  }, [response]);

  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        <div className="mb-[90px]">
          <VoteTitle groupName={voteData?.groupName} groupDate={voteData?.groupDate} />
        </div>
        <VoteBox admin={adminEmail} />
        <div onClick={() => router.push('/vote/setting')}>{currentUserEmail === adminEmail && <VoteStartBtn />}</div>
      </div>
    </section>
  );
};

export default VotePage;

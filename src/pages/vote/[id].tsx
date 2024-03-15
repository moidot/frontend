import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import VoteWaitPage from './wait/[id]';
import VoteDetailPage from './detail/[id]';
import InviteVoteBeforeLogin from '@/components/invite/InviteVoteBeforeLogin';

const VotePage = () => {
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const response = useGetGroupVote(token, group.groupId);
  const [voteData, setVoteData] = useState<any>(null);

  useEffect(() => {
    if (response.data?.message === '성공') setVoteData(response.data?.data);
  }, [response]);

  return (
    <div>
      {token === undefined ? (
        <InviteVoteBeforeLogin />
      ) : voteData && voteData.voteId === -1 ? (
        <VoteWaitPage />
      ) : (
        <VoteDetailPage />
      )}
    </div>
  );
  // return <></>;
};

export default VotePage;

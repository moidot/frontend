import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import VoteWaitPage from './wait/[id]';
import VoteDetailPage from './detail/[id]';
import InviteVoteBeforeLogin from '@/components/invite/InviteVoteBeforeLogin';
import NotFound from '../404';

const VotePage = () => {
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const { data: response, isLoading, isError } = useGetGroupVote(token, group.groupId);
  const [voteData, setVoteData] = useState<any>(null);

  useEffect(() => {
    if (response?.message === '성공') setVoteData(response?.data);
  }, [response]);

  if (isLoading) {
    console.log('isLoading', isLoading);
    return <InviteVoteBeforeLogin />;
  }

  if (isError) {
    console.log('isError', isError);
    return <NotFound />;
  }

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

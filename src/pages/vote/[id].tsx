import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import VoteWaitPage from './wait/[id]';
import VoteDetailPage from './detail/[id]';
import InviteVoteBeforeLogin from '@/components/invite/InviteVoteBeforeLogin';
import NotFound from '../404';
import Head from 'next/head';

const VotePage = () => {
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const { data: response, isLoading, isError } = useGetGroupVote(group.groupId);
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
      <Head>
        <title>투표</title>
        <meta name="description" content="추천된 장소 중 마음에 드는 곳에 투표해보세요." />
      </Head>
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

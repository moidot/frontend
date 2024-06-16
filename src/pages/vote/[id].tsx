import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import VoteWaitPage from './wait/[id]';
import VoteDetailPage from './detail/[id]';
import InviteVoteBeforeLogin from '@/components/invite/InviteVoteBeforeLogin';
import NotFound from '../404';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

const VotePage = (props: any) => {
  const token = api.getToken();
  const userId = api.getId();
  const setGroupId = useSetRecoilState(groupIdAtom);
  const { data: response, isLoading, isError } = useGetGroupVote(parseInt(props.id), userId);
  useEffect(() => {
    sessionStorage.setItem('groupId', props.id);
    setGroupId({
      groupId: parseInt(props.id),
    });
  }, [props.id, response?.data, setGroupId]);
  if (isLoading) {
    console.log('isLoading', isLoading);
    return <InviteVoteBeforeLogin />;
  }

  if (isError) {
    console.log('isError', isError);
    return <NotFound />;
  }

  return (
    <>
      {props && (
        <div>
          <Head>
            <title>모이닷 | 투표</title>
            <meta name="description" content="추천된 장소 중 마음에 드는 곳에 투표해보세요." />
          </Head>
          {token === undefined ? (
            <InviteVoteBeforeLogin />
          ) : response?.data && response?.data?.voteId === -1 ? (
            <VoteWaitPage response={response} />
          ) : (
            <VoteDetailPage response={response} />
          )}
        </div>
      )}
    </>
  );
  // return <></>;
};

export default VotePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  return {
    props: {
      id,
    },
  };
};

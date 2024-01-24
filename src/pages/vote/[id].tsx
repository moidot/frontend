import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const VotePage = () => {
  const router = useRouter();
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const response = useGetGroupVote(token, group.groupId);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    response && response.data?.message == '성공' && setIsOpen(true);
    console.log('vote resopnse..', response.data);
    isOpen ? router.push(`/vote/detail/${group.groupId}`) : router.push(`/vote/wait/${group.groupId}`);
  }, [response]);

  useEffect(() => {}, [group.groupId, isOpen, router]);

  return <div></div>;
};

export default VotePage;

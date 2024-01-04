import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// 투표율 표시를 위한 진행바
const VoteProgressBar = ({ votes }: any) => {
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const response: any = useGetGroupVote(token, group.groupId);
  const [votePeopleData, setVotePeopleData] = useState<any>();
  useEffect(() => {
    if (response.data?.message === '성공') setVotePeopleData(response.data?.data);
  }, [response]);

  const dealt = Math.floor((votes / (votePeopleData?.totalVoteNum === 0 ? 1 : votePeopleData?.totalVoteNum)) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div className="bg-main_orange h-1 rounded-full" style={{ width: `${dealt}%` }}></div>
    </div>
  );
};

export default VoteProgressBar;

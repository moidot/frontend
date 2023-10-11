import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteBox from '@/components/vote/VoteBox';
import VoteStartBtn from '@/components/vote/VoteStartBtn';
import VoteTitle from '@/components/vote/VoteTitle';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';

const VotePage = () => {
  const currentUserEmail = api.getEmail();
  const router = useRouter();
  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        <div className="mb-[90px]">
          <VoteTitle />
        </div>
        <VoteBox />
        <div onClick={() => router.push('/vote/setting')}>
          {currentUserEmail === 'qop341@gmail.com' && <VoteStartBtn />}
        </div>
      </div>
    </section>
  );
};

export default VotePage;

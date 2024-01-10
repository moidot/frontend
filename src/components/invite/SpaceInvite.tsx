import { ParticipationProps } from '@/types/ParticipateType';
import { useEffect, useState } from 'react';
import Header from '../common/header';
import ParticipationList from '../participate/ParticipationList';
import Navbar from '../common/navbar';
import { NAV_LIST } from '../common/navbar/Navigation';
import { getInviteGroup } from '@/apis/getInviteGroup';

const SpaceInvite = ({ router }: any) => {
  const response = getInviteGroup(router.query.id);
  const [partData, setPartData] = useState<ParticipationProps>();

  useEffect(() => {
    const promise = response;
    const getData = () => {
      promise.then((dummy) => {
        setPartData(dummy.data);
      });
    };
    getData();
  }, [response]);

  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {partData && <ParticipationList data={partData} mode={false} setMode={undefined} />}
      </div>
      <div className="flex cursor-pointer w-[585px] h-[78px] mx-auto mt-[100px] mb-[150px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold font-Pretendard">
        내 정보 추가하기
      </div>
    </section>
  );
};

export default SpaceInvite;

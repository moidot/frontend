import { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import ParticipationList from '@/components/participate/ParticipationList';
import { ParticipationProps } from '@/types/ParticipateType';
import { useGetGroup } from '@/hooks/useGetGroup';
import api from '@/services/TokenService';
import { useRecoilValue } from 'recoil';
import { groupIdAtom } from '@/states/groupIdAtom';

const ParticipatePage = () => {
  const [partData, setPartData] = useState<ParticipationProps>();
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const response = useGetGroup(token, group.groupId);
  useEffect(() => {
    if (response.data?.message === '성공') setPartData(response.data?.data);
    console.log(response.data?.data);
  }, [response]);

  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {partData && <ParticipationList data={partData} mode={updateMode} setMode={setUpdateMode} />}
      </div>
    </section>
  );
};

export default ParticipatePage;

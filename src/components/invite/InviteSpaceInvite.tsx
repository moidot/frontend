import { ParticipationProps } from '@/types/ParticipateType';
import { useEffect, useState } from 'react';
import Header from '../common/header';
import ParticipationList from '../participate/ParticipationList';
import Navbar from '../common/navbar';
import { NAV_LIST } from '../common/navbar/Navigation';
import { getInviteGroup } from '@/apis/getInviteGroup';
import LoginPopup from './LoginPopup';
import { useSetRecoilState } from 'recoil';
import { groupNameAtom } from '@/states/groupNameAtom';
// import { useRouter } from 'next/router';

const InviteSpaceInvite = ({ router }: any) => {
  // const rut = useRouter();
  const response = getInviteGroup(router.query.id);
  const [partData, setPartData] = useState<ParticipationProps>();
  const [clickPlus, setClickPlus] = useState<boolean>(false);
  const setGroupName = useSetRecoilState(groupNameAtom);

  useEffect(() => {
    const promise = response;
    const getData = () => {
      promise.then((dummy) => {
        setPartData(dummy.data);
      });
    };
    getData();
    sessionStorage.setItem('groupId', router.query.id);
  }, []);

  useEffect(() => {
    if (partData?.name !== undefined) setGroupName(partData?.name);
  }, [partData?.name, setGroupName]);
  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {partData && <ParticipationList data={partData} mode={false} setMode={undefined} />}
      </div>
      <div
        onClick={() => {
          setClickPlus(true);
        }}
        className="flex cursor-pointer w-[585px] h-[78px] mx-auto mt-[100px] mb-[150px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold font-Pretendard">
        내 정보 추가하기
      </div>
      {clickPlus && <LoginPopup setClickPlus={setClickPlus} />}
    </section>
  );
};

export default InviteSpaceInvite;

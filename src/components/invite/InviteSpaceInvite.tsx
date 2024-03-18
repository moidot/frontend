import { ParticipationProps } from '@/types/ParticipateType';
import { useEffect, useState } from 'react';
import Header from '../common/header';
import ParticipationList from '../participate/ParticipationList';
import { NAV_LIST } from '../common/navbar/Navigation';
import LoginPopup from './LoginPopup';
import { useSetRecoilState } from 'recoil';
import { groupNameAtom } from '@/states/groupNameAtom';
import api from '@/services/TokenService';
import { useGetGroup } from '@/hooks/useGetGroup';
import InviteNavbar from '../common/navbar/inviteIndex';
import { groupIdAtom } from '@/states/groupIdAtom';
// import { useRouter } from 'next/router';

const InviteSpaceInvite = ({ id }: any) => {
  // const rut = useRouter();
  // test 코드...
  // const data = require('/public/test/participate.json');
  // const partData = data.data;

  const response = useGetGroup(parseInt(id));
  const currentUserEmail = api.getEmail();
  const [partData, setPartData] = useState<ParticipationProps>();
  const [clickPlus, setClickPlus] = useState<boolean>(false);
  const [isParticipateCurrentUser, setIsParticipateCurrentUser] = useState<any>('');
  const setGroupName = useSetRecoilState(groupNameAtom);
  const setGroupId = useSetRecoilState(groupIdAtom);

  useEffect(() => {
    if (response?.data?.message === '성공') setPartData(response.data?.data);
    sessionStorage.setItem('groupId', id);
    id !== null && setGroupId(id);
    console.log('id입니다: ', id);
  }, [id, response, setGroupId]);

  // useEffect(() => {
  //   const promise = response;
  //   const getData = () => {
  //     promise.then((dummy) => {
  //       setPartData(dummy.data);
  //     });
  //   };
  //   getData();
  //   sessionStorage.setItem('groupId', router.query.id);
  // }, [response, router.query.id]);

  useEffect(() => {
    if (partData?.name !== undefined) setGroupName(partData?.name);
  }, [partData?.name, setGroupName]);

  useEffect(() => {
    const findUser: any = partData?.participantsByRegion?.find((item: any) =>
      item.participations.find((i: any) => currentUserEmail === i.userEmail),
    );
    findUser &&
      setIsParticipateCurrentUser(
        findUser?.participations?.find((i: any) => i.userEmail === currentUserEmail).userEmail,
      );
  }, [currentUserEmail, partData?.participantsByRegion]);

  return (
    <section>
      <Header />
      <InviteNavbar focusType={NAV_LIST.INVITE} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {partData && <ParticipationList data={partData} mode={false} setMode={undefined} />}
      </div>
      {isParticipateCurrentUser !== currentUserEmail && (
        <div
          onClick={() => {
            setClickPlus(true);
          }}
          className="flex cursor-pointer w-[90vw] desktop:w-[585px] h-[78px] mx-auto mt-[100px] mb-[150px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold font-Pretendard">
          내 정보 추가하기
        </div>
      )}

      {clickPlus && <LoginPopup setClickPlus={setClickPlus} />}
    </section>
  );
};

export default InviteSpaceInvite;

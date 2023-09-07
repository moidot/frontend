'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import Popup from '@/components/participate/popup';
import { fetchInfo } from '@/components/participate/dataFetch';
import ParticipationList from '@/components/participate/list';
import { ParticipationProps } from '@/types/ParticipateType';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from '@/states/currentUserAtom';
// import { useQuery } from '@tanstack/react-query';
// import { getAllParticipantList } from '@/apis/participant';

const ParticipatePage = () => {
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [partData, setPartData] = useState<ParticipationProps>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [role, setRole] = useState<string>('member'); // 모임장 / 모임원 구분
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const deleteLeaderTitle: string = '정말 모이닷 스페이스를 삭제하시겠어요?';
  const deleteLeaderDesc: string =
    '모이닷스페이스에 등록된 모임원의 정보, 추천 장소 정보,\n투표 기록 등 모든 정보가 삭제됩니다!';
  const deleteMemeberTitle: string = "정말 '" + partData?.name + "'에서 나가시겠어요?";
  const deleteMemeberDesc: string =
    '모이닷 스페이스를 나가게 되면 입력하신 정보가 삭제되고\n스페이스 리스트에서 조회가 불가능합니다';
  const getPartData = async () => {
    const data: ParticipationProps = await fetchInfo();
    if (data) setPartData(data as ParticipationProps);
  };
  const currentUserValue = useRecoilValue(currentUserAtom);
  const router = useRouter();
  // const { data } = useQuery(['get-all-participant'], () => getAllParticipantList(7));
  // console.log('data는?', data?.data);

  useEffect(() => {
    getPartData();
    // getAllParticipantList(5);
    // setPartData(data?.data);
  }, []);

  useEffect(() => {
    if (currentUserValue.email === partData?.adminEmail) setRole('leader');
    else setRole('member');
  }, [partData]);

  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {partData && <ParticipationList data={partData} mode={updateMode} setMode={setUpdateMode} />}
        <div className="w-[585px] my-[100px] mx-auto">
          <div
            className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold"
            onClick={() =>
              router.push({
                pathname: '/participant/myInfo',
                query: { nickname: '김아랑', address: '서울 성북구 동소문로4다길 42', transportation: 'PUBLIC' },
              })
            }>
            내 정보 수정하기
          </div>
          <div
            className="cursor-pointer mt-5 text-center text-font_gray text-[20px] underline"
            onClick={() => setIsClickDelete(!isClickDelete)}>
            {role === 'member' ? <span>모이닷 스페이스 나가기</span> : <span>모이닷 스페이스 삭제하기</span>}
          </div>
        </div>
      </div>
      {isClickDelete && (
        <Popup
          role={role}
          title={role === 'member' ? deleteMemeberTitle : deleteLeaderTitle}
          desc={role === 'member' ? deleteMemeberDesc : deleteLeaderDesc}
          setFunction={setIsClickDelete}
        />
      )}
    </section>
  );
};

export default ParticipatePage;

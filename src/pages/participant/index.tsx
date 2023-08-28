'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import Popup from '@/components/participate/popup';
import { fetchInfo } from '@/components/participate/dataFetch';
import ParticipationList from '@/components/participate/list';
import { ParticipationProps } from '@/types/ParticipateType';

const Participate = () => {
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [partData, setPartData] = useState<ParticipationProps>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [role, setRole] = useState<string>('member'); // 모임장 / 모임원 구분
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

  useEffect(() => {
    getPartData();
  }, []);

  return (
    <section>
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        <Header />
        <Navbar focusType={NAV_LIST.PARTICIPANT} />
        {partData && <ParticipationList data={partData} role={role} />}
        <div className="w-[585px] my-[100px] mx-auto">
          <div className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold">
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

export default Participate;

import { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import ParticipationList from '@/components/participate/ParticipationList';
// import { ParticipationProps } from '@/types/ParticipateType';
import { useGetGroup } from '@/hooks/useGetGroup';
import api from '@/services/TokenService';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { groupIdAtom } from '@/states/groupIdAtom';
import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import CommonPopupBox from '@/components/common/popup/CommonPopupBox';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { deleteGroupParticipate } from '@/apis/deleteGroupParticipate';
import { deleteGroup } from '@/apis/deleteGroup';
import { myInfoUserAtom } from '@/states/myInfoUserAtom';

const ParticipatePage = () => {
  // const [partData, setPartData] = useState<ParticipationProps>();
  const [partData, setPartData] = useState<any>();
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [role, setRole] = useState<string>('member'); // 모임장 / 모임원 구분
  const router = useRouter();
  const token = api.getToken();
  const currentUserEmail = api.getEmail();
  const group = useRecoilValue(groupIdAtom);
  const response = useGetGroup(token, group.groupId);
  const setCurrentUserData = useSetRecoilState(myInfoUserAtom);

  const deleteLeaderTitle: string = '정말 모이닷 스페이스를 삭제하시겠어요?';
  const deleteLeaderDesc: string =
    '모이닷스페이스에 등록된 모임원의 정보, 추천 장소 정보,\n투표 기록 등 모든 정보가 삭제됩니다!';
  const deleteMemeberTitle: string = "정말 '" + partData?.name + "'에서 나가시겠어요?";
  const deleteMemeberDesc: string =
    '모이닷 스페이스를 나가게 되면 입력하신 정보가 삭제되고\n스페이스 리스트에서 조회가 불가능합니다';

  useEffect(() => {
    if (response.data?.message === '성공') setPartData(response.data?.data);
  }, [response]);

  useEffect(() => {
    partData && currentUserEmail === partData?.adminEmail ? setRole('leader') : setRole('member');
  }, [currentUserEmail, partData]);

  const deleteGroupMutation = useMutation((groupId: number) => deleteGroup(token, groupId), {
    onSuccess: () => {
      alert('스페이스 삭제 성공');
      router.push('/user'); // 내 모이닷 스페이스로 수정하기
    },
    onError: () => {
      console.log('스페이스 삭제 error');
    },
  });

  // 내정보 수정하기 클릭 시 데이터 전송 함수
  const handleCurrentUserInfo = () => {
    setCurrentUserData({
      nickname: partData?.participantsByRegion.filter((i: any) =>
        i.participations.find((e: any) => e.userEmail === currentUserEmail),
      )[0].participations[0].userName,
      address: partData?.participantsByRegion.filter((i: any) =>
        i.participations.find((e: any) => e.userEmail === currentUserEmail),
      )[0].participations[0].locationName,
      transportation: partData?.participantsByRegion.filter((i: any) =>
        i.participations.find((e: any) => e.userEmail === currentUserEmail),
      )[0].participations[0].transportation,
    });
    router.push('/participant/myInfo');
  };

  const deleteGroupParticipateMutation = useMutation(
    (participateId: number) => deleteGroupParticipate(token, participateId),
    {
      onSuccess: () => {
        alert('스페이스 나가기 성공');
        router.push('/user'); // 내 모이닷 스페이스로 이동
      },
      onError: () => {
        console.log('스페이스 나가기 error');
      },
    },
  );

  return (
    <section>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="max-w-[1200px] mx-auto font-Pretendard">
        {/* 참여자 정보 띄우기 */}
        {partData && <ParticipationList data={partData} mode={updateMode} setMode={setUpdateMode} />}
        {/* 하단 메뉴 - 정보 수정 & 스페이스 삭제/나가기 */}
        {partData && (
          <div className="w-[585px] my-[100px] mx-auto">
            <div
              onClick={handleCurrentUserInfo}
              className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold">
              내 정보 수정하기
            </div>
            <div
              className="cursor-pointer mt-5 text-center text-font_gray text-[20px] underline"
              onClick={() => setIsClickDelete(!isClickDelete)}>
              {currentUserEmail === partData?.adminEmail ? (
                <span>모이닷 스페이스 삭제하기</span>
              ) : (
                <span>모이닷 스페이스 나가기</span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* 삭제 클릭 시 뜨는 팝업 */}
      {isClickDelete && (
        <CommonPopupBackground>
          <CommonPopupBox
            role={role}
            title={role === 'member' ? deleteMemeberTitle : deleteLeaderTitle}
            desc={role === 'member' ? deleteMemeberDesc : deleteLeaderDesc}
            operateFunction={
              role === 'member'
                ? () =>
                    deleteGroupParticipateMutation.mutate(
                      partData?.participantsByRegion.filter((i: any) =>
                        i.participations.find((e: any) => e.userEmail === currentUserEmail),
                      )[0].participations[0].participationId,
                    )
                : () => deleteGroupMutation.mutate(group.groupId) // 테스트 해보기
            }
            setFunction={setIsClickDelete}
          />
        </CommonPopupBackground>
      )}
    </section>
  );
};

export default ParticipatePage;

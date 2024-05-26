import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import ParticipationList from '@/components/participate/ParticipationList';
import LoginPopup from '@/components/invite/LoginPopup';
import { ParticipationProps } from '@/types/ParticipateType';
import { useGetGroup } from '@/hooks/useGetGroup';
import api from '@/services/TokenService';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { groupIdAtom } from '@/states/groupIdAtom';
import { groupNameAtom } from '@/states/groupNameAtom';
import { myInfoUserAtom } from '@/states/myInfoUserAtom';
import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import CommonPopupBox from '@/components/common/popup/CommonPopupBox';
import { useMutation } from '@tanstack/react-query';
import { deleteGroupParticipate } from '@/apis/deleteGroupParticipate';
import { deleteGroup } from '@/apis/deleteGroup';
import LoadingPage from '@/pages/loading';
import NotFound from '@/pages/404';
import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import Head from 'next/head';

const Participate = ({ id }: any) => {
  // const [partData, setPartData] = useState<ParticipationProps>();
  const userId = api.getId();
  const { data: response, isLoading, isError } = useGetGroup(parseInt(id));
  const { data: voteData } = useGetGroupVote(parseInt(id), userId);
  const currentUserEmail = api.getEmail();
  const token = api.getToken();
  const [partData, setPartData] = useState<ParticipationProps>();
  const [clickPlus, setClickPlus] = useState<boolean>(false);
  const [isParticipateCurrentUser, setIsParticipateCurrentUser] = useState<any>('');

  const setGroupName = useSetRecoilState(groupNameAtom);
  const setGroupId = useSetRecoilState(groupIdAtom);

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [voteId, setVoteId] = useState<any>(null);
  const [role, setRole] = useState<string>('member'); // 모임장 / 모임원 구분
  const router = useRouter();
  const group = useRecoilValue(groupIdAtom);
  const setCurrentUserData = useSetRecoilState(myInfoUserAtom);

  const deleteLeaderTitle: string = '정말 모이닷 스페이스를 삭제하시겠어요?';
  const deleteLeaderDesc: string =
    '모이닷스페이스에 등록된 모임원의 정보, 추천 장소 정보,\n투표 기록 등 모든 정보가 삭제됩니다!';
  const deleteMemeberTitle: string = "정말 '" + partData?.name + "'에서 나가시겠어요?";
  const deleteMemeberDesc: string =
    '모이닷 스페이스를 나가게 되면 입력하신 정보가 삭제되고\n스페이스 리스트에서 조회가 불가능합니다';

  useEffect(() => {
    if (response?.message === '성공') setPartData(response?.data);
  }, [response]);

  useEffect(() => {
    if (voteData?.data) setVoteId(voteData?.data?.voteId);
  }, [voteData]);

  useEffect(() => {
    sessionStorage.setItem('groupId', id);
    setGroupId({
      groupId: parseInt(id),
    });
  }, [id, setGroupId]);

  useEffect(() => {
    if (partData?.name !== undefined) setGroupName(partData?.name);
  }, [partData?.name, setGroupName]);

  useEffect(() => {
    partData && currentUserEmail === partData?.adminEmail ? setRole('leader') : setRole('member');
  }, [currentUserEmail, partData]);

  useEffect(() => {
    const findUser: any = partData?.participantsByRegion?.find((item: any) =>
      item.participations.find((i: any) => currentUserEmail === i.userEmail),
    );
    findUser &&
      setIsParticipateCurrentUser(
        findUser?.participations?.find((i: any) => i.userEmail === currentUserEmail).userEmail,
      );
  }, [currentUserEmail, partData?.participantsByRegion]);

  const deleteGroupMutation = useMutation((groupId: number) => deleteGroup(token, groupId), {
    onSuccess: () => {
      alert('모이닷 스페이스를 삭제했습니다.');
      location.replace('/user'); // 내 모이닷 스페이스로 수정하기
    },
    onError: () => {
      console.log('스페이스 삭제 error');
    },
  });

  const deleteGroupParticipateMutation = useMutation(
    (participateId: number) => deleteGroupParticipate(token, participateId),
    {
      onSuccess: () => {
        alert('모이닷 스페이스를 나갔습니다.');
        location.replace('/user'); // 내 모이닷 스페이스로 이동
      },
      onError: () => {
        console.log('스페이스 나가기 error');
      },
    },
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <NotFound />;
  }

  // 내정보 수정하기 클릭 시 데이터 전송 함수
  const handleCurrentUserInfo = () => {
    partData &&
      (setCurrentUserData({
        nickname: partData?.participantsByRegion.filter((i: any) =>
          i.participations.find((e: any) => e.userEmail === currentUserEmail),
        )[0].participations[0].userName,
        address: partData?.participantsByRegion.filter((i: any) =>
          i.participations.find((e: any) => e.userEmail === currentUserEmail),
        )[0].participations[0].locationName,
        transportation: partData?.participantsByRegion.filter((i: any) =>
          i.participations.find((e: any) => e.userEmail === currentUserEmail),
        )[0].participations[0].transportation,
      }),
      router.push('/participant/myInfo'));
  };

  return (
    <section>
      <Head>
        <title>모이닷 | 참여 정보</title>
        <meta name="description" content="모임원의 출발지, 이동수단 등 모임 참여에 관한 자세한 정보를 확인해보세요." />
      </Head>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
      <div className="w-[80vw] desktop:w-[62.5vw] mx-auto font-Pretendard">
        {/* 참여자 정보 띄우기 */}
        {partData && <ParticipationList data={partData} mode={updateMode} setMode={setUpdateMode} />}
        {/* 하단 메뉴 - 정보 수정 & 스페이스 삭제/나가기 */}
        {isParticipateCurrentUser !== currentUserEmail ? (
          <div
            onClick={() => {
              voteId === -1 ? setClickPlus(true) : alert('투표 시작 후에는 참여가 불가능합니다.');
            }}
            className="cursor-pointer mx-auto flex w-[80vw] tablets:w-[62.5vw] desktop:w-[30.5vw] h-[48px] desktop:h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-mobile_b3 desktop:text-b1 font-bold my-[50px] desktop:my-[100px]">
            내 정보 추가하기
          </div>
        ) : (
          <div className="w-[80vw] mx-auto tablets:w-[62.5vw] desktop:w-[30.5vw] my-[50px] desktop:my-[100px]">
            <div
              onClick={handleCurrentUserInfo}
              className="cursor-pointer flex w-[80vw] tablets:w-[62.5vw] desktop:w-[30.5vw] h-[48px] desktop:h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-mobile_b3 desktop:text-b1 font-bold">
              내 정보 수정하기
            </div>
            <div
              className="cursor-pointer mt-5 mb-5 text-center text-font_gray text-mobile_b4 desktop:text-[20px] underline"
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
      {clickPlus && <LoginPopup setClickPlus={setClickPlus} />}
      {/* 삭제 클릭 시 뜨는 팝업 */}
      {partData && isClickDelete && (
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

export default Participate;

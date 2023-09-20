import Master from '@assets/participate/icon_master.svg';
import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';
import Copy from '@assets/participate/icon_copy.svg';
import DeleteBtn from '@assets/participate/icon_delete.svg';
import Car from '@assets/transportation/icon_circle_car.svg';
import Sub from '@assets/transportation/icon_circle_sub.svg';
import { ParticipantsByRegionProps, ParticipationDataProps, ParticipationsProps } from '@/types/ParticipateType';
import { handleCopyClipBoard } from '@/utils/copyUrl';
import { useRecoilValue } from 'recoil';
import api from '@/services/TokenService';
import { useEffect, useState } from 'react';
import CommonPopupBackground from '../common/popup/CommonPopupBackground';
import CommonPopupBox from '../common/popup/CommonPopupBox';
import { useMutation } from '@tanstack/react-query';
import { deleteGroupParticipateRemoval } from '@/apis/deleteGroupParticipateRemoval';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteGroup } from '@/apis/deleteGroup';
import { deleteGroupParticipate } from '@/apis/deleteGroupParticipate';
// import { useDeleteGroupParticipateRemoval } from '@/hooks/useDeleteGroupParticipateRemoval';

const ParticipationList = ({ data, mode, setMode }: ParticipationDataProps) => {
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [isClickedRemoval, setIsClickedRemoval] = useState(false);
  const [role, setRole] = useState<string>('member'); // 모임장 / 모임원 구분
  const [userName, setUserName] = useState<string>('');
  const currentUser = useState<ParticipationsProps>({
    participationId: 5,
    userEmail: 'moidot@gmail.com',
    userName: '김모람람',
    locationName: '서울 성북구 보문로34다길 2',
    transportation: 'PUBLIC',
  });
  const currentUserValue = useRecoilValue(userInfoAtom); // 로그인한 유저 정보 가져오기
  const location = { pathname: 'https://www.moidot.kr' }; // 배포 url로 변경하기
  const router = useRouter();
  const token = api.getToken();
  const deleteLeaderTitle: string = '정말 모이닷 스페이스를 삭제하시겠어요?';
  const deleteLeaderDesc: string =
    '모이닷스페이스에 등록된 모임원의 정보, 추천 장소 정보,\n투표 기록 등 모든 정보가 삭제됩니다!';
  const deleteMemeberTitle: string = "정말 '" + data?.name + "'에서 나가시겠어요?";
  const deleteMemeberDesc: string =
    '모이닷 스페이스를 나가게 되면 입력하신 정보가 삭제되고\n스페이스 리스트에서 조회가 불가능합니다';
  const removalMemeberTitle: string = "정말 모임원  '" + userName + "'을(를) 삭제하시겠어요?";
  const removalMemeberDesc: string =
    '모임원을 삭제하시면 해당 모임원이 작성한\n모든 정보가 삭제되며 다시 불러올 수 없습니다.';
  const removalMutation = useMutation((participantId: number) => deleteGroupParticipateRemoval(token, participantId), {
    onSuccess: () => {
      alert('내보내기 성공');
      router.push('/participate');
    },
    onError: () => {
      console.log('내보내기 error');
    },
  });

  const deleteGroupMutation = useMutation((groupId: number) => deleteGroup(token, groupId), {
    onSuccess: () => {
      alert('스페이스 삭제 성공');
      router.push('/participate'); // 내 모이닷 스페이스로 수정하기
    },
    onError: () => {
      console.log('스페이스 삭제 error');
    },
  });

  const deleteGroupParticipateMutation = useMutation(
    (participateId: number) => deleteGroupParticipate(token, participateId),
    {
      onSuccess: () => {
        alert('스페이스 나가기 성공');
        router.push('/'); // 내 모이닷 스페이스로 수정하기
      },
      onError: () => {
        console.log('스페이스 나가기 error');
      },
    },
  );

  useEffect(() => {
    data && currentUserValue.email === data?.adminEmail ? setRole('leader') : setRole('member');
  }, [currentUserValue.email, data]);

  // useEffect(() => {
  //   console.log('role', role);
  // }, [role]);

  return (
    <div className="max-w-[1200px]">
      <div className="text-center mt-10">
        <div className="text-h1 font-bold text-font_black">{data.name}</div>
        <div className="text-h3 font-bold text-font_gray">{data.date}</div>
      </div>
      <div className="w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <div className="flex w-[440px] justify-between items-center text-b3 text-font_black mx-auto">
          <div
            className="flex items-center cursor-pointer text-b2"
            onClick={() => handleCopyClipBoard(`${location.pathname}`)}>
            URL 복사하기
            <Copy className="ml-2" />
          </div>
          <div className="w-[1px] h-[26px] bg-bg_light_gray"></div>
          <div className="flex items-center cursor-pointer text-b2">
            카카오톡 공유하기
            <KakaoTalk className="ml-2" />
          </div>
        </div>
      </div>
      <div className="relative">
        {currentUserValue.email === data.adminEmail && (
          <button
            type="button"
            className="absolute right-0 w-[155px] h-[54px] bg-bg_orange rounded-2xl text-b2 text-alert_delete"
            onClick={() => setMode(!mode)}>
            내보내기
          </button>
        )}
        {data.participantsByRegion &&
          data.participantsByRegion.map((item: ParticipantsByRegionProps, index: number) => (
            <div className="mt-[72px]" key={index}>
              <div className="flex justify-between mb-5">
                <div className="max-w-[265px] px-[32px] py-[8px] rounded-[53px] bg-main_orange text-b1 text-white font-bold">
                  {item.regionName}
                </div>
              </div>
              {item.participations &&
                item.participations.map((part: ParticipationsProps) => (
                  <div
                    key={part.participationId}
                    className="flex justify-between w-full h-[100px] items-center rounded-2xl pl-[24px] font-bold text-font_black mb-4"
                    style={
                      //현재 로그인 한 유저 배경색 짙게 표시
                      currentUserValue.email === part.userEmail
                        ? { backgroundColor: '#FFEADB' }
                        : { backgroundColor: '#FFF9F5' }
                    }>
                    <div className="flex items-center text-b1">
                      {/* 모임장 왕관 표시 */}
                      {data.adminEmail === part.userEmail && <Master className="mr-2" />}
                      <span>{part.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-font_gray font-light pr-4 text-b2">{part.locationName}</span>
                      {mode ? ( // 내보내기 or 교통 수단 확인
                        currentUserValue.email === part.userEmail ? (
                          <div className="mr-[94px]"></div>
                        ) : (
                          <DeleteBtn
                            className="mr-[24px] cursor-pointer"
                            onClick={() => {
                              setIsClickedRemoval(true), setUserName(part.userName);
                            }}
                          />
                        )
                      ) : part.transportation === 'PUBLIC' ? (
                        <Sub className="mr-[24px]" />
                      ) : (
                        <Car className="mr-[24px]" />
                      )}
                    </div>
                    {isClickedRemoval && (
                      <CommonPopupBackground>
                        <CommonPopupBox
                          role="leader"
                          title={removalMemeberTitle}
                          desc={removalMemeberDesc}
                          operateFunction={() => removalMutation.mutate(part.participationId)}
                          setFunction={setIsClickedRemoval}
                        />
                      </CommonPopupBackground>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </div>
      <div className="w-[585px] my-[100px] mx-auto">
        <Link
          className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl text-white text-b1 font-bold"
          href={{
            pathname: '/participant/myInfo',
            query: {
              teamName: data.name,
              date: data.date,
              nickname: currentUser[0]?.userName,
              address: currentUser[0]?.locationName,
              transportation: currentUser[0]?.transportation,
            },
          }}
          as="/participant/myInfo">
          내 정보 수정하기
        </Link>
        <div
          className="cursor-pointer mt-5 text-center text-font_gray text-[20px] underline"
          onClick={() => setIsClickDelete(!isClickDelete)}>
          {currentUserValue.email === data.adminEmail ? (
            <span>모이닷 스페이스 삭제하기</span>
          ) : (
            <span>모이닷 스페이스 나가기</span>
          )}
        </div>
      </div>
      {isClickDelete && (
        <CommonPopupBackground>
          <CommonPopupBox
            role={role}
            title={role === 'member' ? deleteMemeberTitle : deleteLeaderTitle}
            desc={role === 'member' ? deleteMemeberDesc : deleteLeaderDesc}
            operateFunction={
              role === 'member' ? () => deleteGroupParticipateMutation.mutate(6) : () => deleteGroupMutation.mutate(7)
            }
            setFunction={setIsClickDelete}
          />
        </CommonPopupBackground>
      )}
    </div>
  );
};

export default ParticipationList;

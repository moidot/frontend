import UrlButton from '@/components/common/button/url';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteChoiceOption from '@/components/vote/VoteChoiceOption';
import VoteTitle from '@/components/vote/VoteTitle';
import VoteEndPopup from '@/components/vote/detail/VoteEndPopup';
import { useEffect, useState } from 'react';
import VoteKakaoMap from '@/components/vote/detail/VoteKakaoMap';
import { voteSelectPlaceData } from '@/types/VoteType';
import { VoteStatusData } from '@/types/VoteType';
import api from '@/services/TokenService';
import { RecoilEnv, useRecoilValue } from 'recoil';
import { VoteSelectData, postGroupVoteSelect } from '@/apis/postGroupVoteSelect';
import { useMutation } from '@tanstack/react-query';
import { handleDateFormat } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import { groupIdAtom } from '@/states/groupIdAtom';

const VoteDetailPage = ({ response }: any) => {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let votePlaceIds: any = [];
  // (02/22) 테스트하기 - 변수로 관리해 제대로 반영이 안되던 투표 배열 state로 관리하게 수정

  const locationUrl = useRouter();
  const [voteEndAt, setVoteEndAt] = useState<any>(''); // 투표 종료 시간 데이터
  const [clickedStartBtn, setClickedStartBtn] = useState<boolean>(false); // 투표하기 버튼 선택/미선택
  const [clickedAgainBtn, setClickedAgainBtn] = useState<boolean>(false); // 재투표 버튼 선택/미선택
  const [clickedEndVote, setClickedEndVote] = useState<boolean>(false); // 투표 종료 버튼 클릭 여부
  const [voteMax, setVoteMax] = useState<any>();
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const groupAdminId = typeof window !== 'undefined' ? sessionStorage.getItem('adminId') : null;
  const [voteIds, setVoteIds] = useState<any>([]);

  // const { data: response } = useGetGroupVote(group.groupId, userId);
  const currentId = api.getEmail();
  const voteP: voteSelectPlaceData = {
    groupId: group.groupId,
    bestPlaceIds: voteIds,
  };

  // 투표 종료일 포맷 변경
  useEffect(() => {
    const changeDate = handleDateFormat(response?.data?.endAt);
    setVoteEndAt(changeDate);
  }, [response?.data?.endAt]);

  //보류 --- 재투표 버튼 눌렀을 때 체크한 데이터 저장하기
  useEffect(() => {
    if (response?.data?.voteStatuses) {
      const temp = response?.data?.voteStatuses?.filter((item: any) => item.isVoted);
      // temp?.map((item) => votePlaceIds.push(item.bestPlaceId));
      const temp2 = temp?.map((item: any) => item.bestPlaceId);
      setVoteIds(temp2);
    }
  }, [response?.data?.voteStatuses]);

  useEffect(() => {
    response?.data.voteStatuses &&
      setVoteMax(
        response?.data?.voteStatuses.reduce((prev: any, value: any) => {
          return prev.votes >= value.votes ? prev : value;
        }, 0),
      );
    console.log('voteMax is...', voteMax);
  }, [response?.data.voteStatuses, voteMax]);

  useEffect(() => {
    console.log('voteIDS... : ', voteIds);
    voteIds.length > 0 ? setClickedStartBtn(true) : setClickedStartBtn(false);
  }, [voteIds]);

  //투표 참여 API react-query mutation
  const postGroupVoteSelectMutation: any = useMutation((data: VoteSelectData) => postGroupVoteSelect(token, data), {
    onSuccess: () => {
      alert('투표 참여 완료!');
      location.reload();
    },
    onError: () => {
      alert('투표에 실패했습니다.');
    },
  });

  return (
    <section className="font-Pretendard">
      <Header />
      <Navbar focusType={NAV_LIST.VOTE} />
      <VoteTitle groupName={response?.data?.groupName} groupDate={response?.data?.groupDate} />
      {/* url 박스 */}
      {response?.data && (
        <div className="w-[90vw] tablets:w-[80vw] desktop:w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[20px] tablets:mt-[30px] mb-[30px] tablets:mb-[48px] p-[15px]">
          <div className="text-main_orange text-mobile_b3 desktop:text-b1 font-bold mb-[15px]">
            모임원을 초대해보세요!
          </div>
          <UrlButton pathname={locationUrl?.asPath} teamname={response?.data?.groupName} />
        </div>
      )}
      {/* 지도 자리 */}
      {response?.data?.voteStatuses && <VoteKakaoMap locationInfo={response?.data?.voteStatuses} />}
      {/* 투표 탭 */}
      <div className="w-[90vw] tablets:w-[62.5vw] mx-auto bg-white">
        <div className="w-full h-[60px] tablets:h-[74px] mt-2 flex justify-between items-center">
          <div className="w-[150px] tablets:w-[170px] h-[40px] tablets:h-[50px] flex justify-between text-b3">
            {response?.data?.isEnabledMultipleChoice ? (
              <div className="text-main_orange">● 복수선택</div>
            ) : (
              <div className="text-font_gray">● 복수선택</div>
            )}
            {response?.data?.isAnonymous ? (
              <div className="text-main_orange">● 익명투표</div>
            ) : (
              <div className="text-font_gray">● 익명투표</div>
            )}
          </div>
          <div className="text-b3 tablets:text-b2 text-font_gray">{voteEndAt}</div>
        </div>
        {/* 투표 창 */}
        <div
          className="w-[100%] mx-auto cursor-pointer"
          style={{
            pointerEvents: response?.data?.isClosed
              ? 'none'
              : response?.data?.isVotingParticipant
              ? clickedAgainBtn
                ? 'auto'
                : 'none'
              : 'auto',
          }}>
          {response?.data?.voteStatuses.map((item: VoteStatusData) => (
            <VoteChoiceOption
              key={item.bestPlaceId}
              votePlaceIds={voteIds}
              setVoteIds={setVoteIds}
              votes={item.votes}
              placeName={item.placeName}
              isVoted={item.isVoted}
              bestPlaceId={item.bestPlaceId}
              latitude={item.latitude}
              longitude={item.longitude}
              isEnabledMultipleChoice={response?.data.isEnabledMultipleChoice}
              isAnonymous={response?.data.isAnonymous}
              isClosed={response?.data.isClosed}
              voteMax={voteMax}
            />
          ))}
        </div>

        {/* 투표가 진행중이고 참여자가 있을 때 버튼 보임 */}
        {!response?.data?.isClosed &&
          (response?.data?.isVotingParticipant ? (
            clickedAgainBtn ? (
              // 재투표 선택
              <div
                onClick={() => {
                  setClickedAgainBtn(false), clickedAgainBtn && postGroupVoteSelectMutation.mutate(voteP);
                }}
                className="cursor-pointer flex w-[60vw] desktop:w-[585px] h-[72px] items-center justify-center bg-main_orange rounded-2xl mx-auto mt-[60px] mb-[22px] text-white text-b2">
                다시 투표하기
              </div>
            ) : (
              <div
                onClick={() => {
                  setClickedAgainBtn(true);
                }}
                className="cursor-pointer flex w-[60vw] desktop:w-[585px] h-[72px] items-center justify-center border-2 bg-btn_disabled rounded-2xl mx-auto mt-[60px] mb-[22px] text-font_gray text-b2">
                다시 투표하기
              </div>
            )
          ) : clickedStartBtn ? (
            <div
              onClick={() => {
                setClickedStartBtn(!clickedStartBtn), clickedStartBtn && postGroupVoteSelectMutation.mutate(voteP);
              }}
              className="cursor-pointer flex w-[60vw] desktop:w-[585px] h-[72px] items-center justify-center bg-main_orange rounded-2xl mx-auto mt-[60px] mb-[22px] text-white text-b2">
              투표하기
            </div>
          ) : (
            <div className="cursor-pointer flex w-[60vw] desktop:w-[585px] h-[72px] items-center justify-center border-2 bg-btn_disabled rounded-2xl mx-auto mt-[60px] mb-[22px] text-font_gray text-b2">
              투표하기
            </div>
          ))}
        {/* 모임장일 때만 버튼 생성 */}
        {currentId === groupAdminId && response?.data?.isClosed === false ? (
          <div
            onClick={() => setClickedEndVote(!clickedEndVote)}
            className="cursor-pointer flex w-[60vw] desktop:w-[585px] h-[72px] mb-[150px] items-center justify-center border-2 border-main_orange rounded-2xl mx-auto text-main_orange text-b2 box-border">
            투표 종료하기
          </div>
        ) : (
          <div className="mb-[150px]"></div>
        )}
      </div>
      {clickedEndVote && <VoteEndPopup clickedEndVote={clickedEndVote} setClickedEndVote={setClickedEndVote} />}
    </section>
  );
};

export default VoteDetailPage;

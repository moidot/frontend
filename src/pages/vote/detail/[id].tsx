import UrlButton from '@/components/common/button/url';
import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';
import VoteChoiceOption from '@/components/vote/VoteChoiceOption';
import VoteTitle from '@/components/vote/VoteTitle';
import VoteEndPopup from '@/components/vote/detail/VoteEndPopup';
import { useEffect, useState } from 'react';
import VoteKakaoMap from '@/components/vote/detail/VoteKakaoMap';
import { VoteData, voteSelectPlaceData } from '@/types/VoteType';
import { useGetGroupVote } from '@/hooks/useGetGroupVote';
import { VoteStatusData } from '@/types/VoteType';
import api from '@/services/TokenService';
import { useRecoilValue, RecoilEnv } from 'recoil';
import { VoteSelectData, postGroupVoteSelect } from '@/apis/postGroupVoteSelect';
import { useMutation } from '@tanstack/react-query';
import { groupIdAtom } from '@/states/groupIdAtom';
import { handleDateFormat } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';

const VoteDetailPage = () => {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let votePlaceIds: any = [];
  // (02/22) 테스트하기 - 변수로 관리해 제대로 반영이 안되던 투표 배열 state로 관리하게 수정
  const [voteIds, setVoteIds] = useState<any>([]);
  const locationUrl = useRouter();
  const [voteData, setVoteData] = useState<VoteData>(); // 투표 전체 데이터
  const [voteEndAt, setVoteEndAt] = useState<any>(''); // 투표 종료 시간 데이터
  const [clickedStartBtn, setClickedStartBtn] = useState<boolean>(false); // 투표하기 버튼 선택/미선택
  const [clickedAgainBtn, setClickedAgainBtn] = useState<boolean>(false); // 재투표 버튼 선택/미선택
  const [clickedEndVote, setClickedEndVote] = useState<boolean>(false); // 투표 종료 버튼 클릭 여부
  const [voteMax, setVoteMax] = useState<any>();
  const token = api.getToken();
  const groupIdData = useRecoilValue(groupIdAtom);
  // const groupAdminId = useRecoilValue(groupAdminIdAtom);
  const groupAdminId = typeof window !== 'undefined' ? sessionStorage.getItem('adminId') : null;

  const response = useGetGroupVote(token, groupIdData.groupId);
  const currentId = api.getEmail();
  const voteP: voteSelectPlaceData = {
    groupId: groupIdData.groupId,
    bestPlaceIds: voteIds,
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //투표 데이터 voteData 변수에 저장하기
  useEffect(() => {
    if (response.data?.message === '성공') setVoteData(response.data?.data);
    console.log('vote data', voteData);
  }, [response, voteData]);

  // 투표 종료일 포맷 변경
  useEffect(() => {
    const changeDate = handleDateFormat(voteData?.endAt);
    setVoteEndAt(changeDate);
  }, [voteData?.endAt]);

  //보류 --- 재투표 버튼 눌렀을 때 체크한 데이터 저장하기
  useEffect(() => {
    const temp = voteData?.voteStatuses.filter((item) => item.isVoted);
    // temp?.map((item) => votePlaceIds.push(item.bestPlaceId));
    temp?.map((item) => setVoteIds([...voteIds, item.bestPlaceId]));
  }, [clickedAgainBtn]);

  useEffect(() => {
    setVoteMax(
      voteData?.voteStatuses &&
        voteData?.voteStatuses.reduce((prev, value) => {
          return prev.votes >= value.votes ? prev : value;
        }),
    );
    console.log('voteMax is...', voteMax);
  }, [voteData?.isClosed, voteData?.voteStatuses, voteMax]);

  useEffect(() => {
    console.log('voteIDS... : ', voteIds);
  }, [voteIds]);
  //투표 참여 API react-query mutation
  const postGroupVoteSelectMutation = useMutation((data: VoteSelectData) => postGroupVoteSelect(token, data), {
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
      <VoteTitle groupName={voteData?.groupName} groupDate={voteData?.groupDate} />
      {/* url 박스 */}
      <div className="w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <UrlButton pathname={locationUrl?.asPath} />
      </div>
      {/* 지도 자리 */}
      {voteData?.voteStatuses && <VoteKakaoMap locationInfo={voteData?.voteStatuses} />}
      {/* 투표 탭 */}
      <div className="w-[1200px] mx-auto">
        <div className="w-full h-[74px] mt-2 flex justify-between items-center">
          <div className="w-[170px] h-[50px] flex justify-between text-b3">
            {voteData?.isEnabledMultipleChoice ? (
              <div className="text-main_orange">● 복수선택</div>
            ) : (
              <div className="text-font_gray">● 복수선택</div>
            )}
            {voteData?.isAnonymous ? (
              <div className="text-main_orange">● 익명투표</div>
            ) : (
              <div className="text-font_gray">● 익명투표</div>
            )}
          </div>
          <div className="text-b2 text-font_gray">{voteEndAt}</div>
        </div>
        {/* 투표 창 */}
        <div className="w-[1168px] mx-auto">
          <div className="w-[1168px] mx-auto cursor-pointer">
            {voteData?.voteStatuses.map((item: VoteStatusData) => (
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
                isAnonymous={voteData.isAnonymous}
                isClosed={voteData.isClosed}
                voteMax={voteMax}
              />
            ))}
          </div>
        </div>

        {/* 투표가 진행중이고 참여자가 있을 때 버튼 보임 */}
        {!voteData?.isClosed &&
          (voteData?.isVotingParticipant ? (
            clickedAgainBtn ? (
              // 재투표 선택
              <div
                onClick={() => {
                  setClickedAgainBtn(false), clickedAgainBtn && postGroupVoteSelectMutation.mutate(voteP);
                }}
                className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center bg-main_orange rounded-2xl mx-auto mt-[60px] mb-[22px] text-white text-b2">
                다시 투표하기
              </div>
            ) : (
              <div
                onClick={() => {
                  setClickedAgainBtn(true);
                }}
                className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center border-2 bg-btn_disabled rounded-2xl mx-auto mt-[60px] mb-[22px] text-font_gray text-b2">
                다시 투표하기
              </div>
            )
          ) : clickedStartBtn ? (
            <div
              onClick={() => {
                setClickedStartBtn(!clickedStartBtn), clickedStartBtn && postGroupVoteSelectMutation.mutate(voteP);
              }}
              className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center bg-main_orange rounded-2xl mx-auto mt-[60px] mb-[22px] text-white text-b2">
              투표하기
            </div>
          ) : (
            <div
              onClick={() => {
                setClickedStartBtn(!clickedStartBtn), clickedStartBtn && postGroupVoteSelectMutation.mutate(voteP);
              }}
              className="cursor-pointer flex w-[585px] h-[72px] items-center justify-center border-2 bg-btn_disabled rounded-2xl mx-auto mt-[60px] mb-[22px] text-font_gray text-b2">
              투표하기
            </div>
          ))}
        {/* 모임장일 때만 버튼 생성 */}
        {currentId === groupAdminId ? (
          <div
            onClick={() => setClickedEndVote(!clickedEndVote)}
            className="cursor-pointer flex w-[585px] h-[72px] mb-[150px] items-center justify-center border-2 border-main_orange rounded-2xl mx-auto text-main_orange text-b2 box-border">
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

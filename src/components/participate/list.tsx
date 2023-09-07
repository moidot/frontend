import Master from '@assets/participate/icon_master.svg';
import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';
import Copy from '@assets/participate/icon_copy.svg';
import DeleteBtn from '@assets/participate/icon_delete.svg';
import Car from '@assets/transportation/icon_circle_car.svg';
import Sub from '@assets/transportation/icon_circle_sub.svg';
import { ParticipantsByRegionProps, ParticipationDataProps, ParticipationsProps } from '@/types/ParticipateType';
import { handleCopyClipBoard } from '@/utils/copyUrl';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from '@/states/currentUserAtom';
import { useMutation } from '@tanstack/react-query';
import { exitParticipant } from '@/apis/participant';

const ParticipationList = ({ data, mode, setMode }: ParticipationDataProps) => {
  const currentUserValue = useRecoilValue(currentUserAtom); // 로그인한 유저 정보 가져오기
  const location = { pathname: 'http://baseurl.com/participant' }; // 배포 url로 변경하기
  const { mutate } = useMutation((participantId: number) => exitParticipant(participantId), {
    onSuccess: () => {
      // mutate가 정상적으로 실행되면, 함수를 실행합니다.
      console.log('내보내기 성공');
    },
    onError: () => {
      // mutate가 실패하면, 함수를 실행합니다.
      console.log('내보내기 error');
    },
  });
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
                      {/* 교통 수단 표시 */}
                      {mode ? (
                        <DeleteBtn className="mr-[24px]" onClick={() => mutate(1)} />
                      ) : part.transportation === 'PUBLIC' ? (
                        <Sub className="mr-[24px]" />
                      ) : (
                        <Car className="mr-[24px]" />
                      )}
                      {}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ParticipationList;

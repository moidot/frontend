import Master from '@assets/participate/icon_master.svg';
import DeleteBtn from '@assets/participate/icon_delete.svg';
import Car from '@assets/transportation/icon_circle_car.svg';
import Sub from '@assets/transportation/icon_circle_sub.svg';
import { ParticipantsByRegionProps, ParticipationDataProps, ParticipationsProps } from '@/types/ParticipateType';
import api from '@/services/TokenService';
import { useEffect, useState } from 'react';
import CommonPopupBackground from '../common/popup/CommonPopupBackground';
import CommonPopupBox from '../common/popup/CommonPopupBox';
import { useMutation } from '@tanstack/react-query';
import { deleteGroupParticipateRemoval } from '@/apis/deleteGroupParticipateRemoval';

import UrlButton from '../common/button/url';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { participateIdAtom } from '@/states/participateIdAtom';

const ParticipationList = ({ data, mode = false, setMode = () => {} }: ParticipationDataProps) => {
  const [isClickedRemoval, setIsClickedRemoval] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const setPartId = useSetRecoilState(participateIdAtom);
  const locationUrl = useRouter();
  const token = api.getToken();
  const currentUserEmail = api.getEmail(); // 로그인한 유저 정보 가져오기
  const removalMemeberTitle: string = "정말 모임원  '" + userName + "'을(를) 삭제하시겠어요?";
  const removalMemeberDesc: string =
    '모임원을 삭제하시면 해당 모임원이 작성한\n모든 정보가 삭제되며 다시 불러올 수 없습니다.';
  let clientWidth: any;

  if (typeof document !== 'undefined') {
    clientWidth = document.documentElement.clientWidth;
  }
  const removalMutation = useMutation((participantId: number) => deleteGroupParticipateRemoval(token, participantId), {
    onSuccess: () => {
      alert('내보내기 성공');
      location.reload();
    },
    onError: () => {
      console.log('내보내기 error');
    },
  });

  useEffect(() => {
    const currentUserInfo = data.participantsByRegion.filter((item) =>
      item.participations.find((part) => part.userEmail === currentUserEmail),
    );
    currentUserInfo[0]?.participations[0] && setPartId(currentUserInfo[0]?.participations[0]?.participationId);
  }, [currentUserEmail, data.participantsByRegion, setPartId]);

  return (
    <div className="w-[80vw] mx-auto desktop:w-[62.5vw]">
      <div className="text-center mt-10">
        <div className="text-mobile_h3 desktop:text-h1 font-bold text-font_black">{data.name}</div>
        <div className="text-mobile_b4 desktop:text-h3 font-bold text-font_gray">{data.date}</div>
      </div>
      {/* URL 복사 & 카톡 공유 박스 */}
      <div className="w-[80vw] desktop:w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-mobile_b3 desktop:text-b1 font-bold mb-[15px]">
          모임원을 초대해보세요!
        </div>
        <UrlButton pathname={locationUrl?.asPath} teamname={data?.name} />
      </div>
      <div className="relative">
        {/* 내보내기 버튼 */}
        {currentUserEmail === data.adminEmail && (
          <button
            type="button"
            className="absolute right-0 w-[74px] h-[27px] desktop:w-[155px] desktop:h-[54px] bg-bg_orange rounded-2xl text-mobile_b4 desktop:text-b2 text-alert_delete"
            onClick={() => setMode(!mode)}>
            내보내기
          </button>
        )}
        {/* 참여중인 유저 정보 나열*/}
        {data.participantsByRegion &&
          data.participantsByRegion.map((item: ParticipantsByRegionProps, index: number) => (
            <div className="mt-[36px] desktop:mt-[72px]" key={index}>
              <div className="flex justify-between mb-5">
                <div className="max-w-[265px] px-[16px] py-[4px] desktop:px-[32px] desktop:py-[8px] rounded-[53px] bg-main_orange text-mobile_b4 desktop:text-b1 text-white font-bold">
                  {item.regionName}
                </div>
              </div>
              {item.participations &&
                item.participations.map((part: ParticipationsProps) => (
                  <div
                    key={part.participationId}
                    className="flex justify-between w-full h-[52px] desktop:h-[100px] items-center rounded-2xl pl-[12px] desktop:pl-[24px] font-bold text-font_black mb-2 desktop:mb-4"
                    style={
                      //현재 로그인 한 유저 배경색 짙게 표시
                      currentUserEmail === part.userEmail
                        ? { backgroundColor: '#FFEADB' }
                        : { backgroundColor: '#FFF9F5' }
                    }>
                    <div className="flex items-center text-mobile_b4 desktop:text-b1">
                      {/* 모임장 왕관 표시 */}
                      {data.adminEmail === part.userEmail &&
                        (clientWidth && clientWidth <= 768 ? (
                          <svg width="20" height="20" viewBox="0 0 30 25">
                            <Master className="mr-2" />
                          </svg>
                        ) : (
                          <Master className="mr-2" />
                        ))}
                      <span>{part.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-font_gray font-light pr-4 text-mobile_b4 desktop:text-b2">
                        {part.locationName}
                      </span>
                      {mode ? ( // 내보내기 or 교통 수단 확인
                        currentUserEmail === part.userEmail ? (
                          <div className="mr-[60px] tablets:mr-[94px]"></div>
                        ) : clientWidth && clientWidth <= 768 ? (
                          <svg width="50" height="50" viewBox="0 0 100 75">
                            <DeleteBtn
                              className="mr-[12px] desktop:mr-[24px] cursor-pointer"
                              onClick={() => {
                                setIsClickedRemoval(true), setUserName(part.userName);
                              }}
                            />
                          </svg>
                        ) : (
                          <DeleteBtn
                            className="mr-[12px] desktop:mr-[24px] cursor-pointer"
                            onClick={() => {
                              setIsClickedRemoval(true), setUserName(part.userName);
                            }}
                          />
                        )
                      ) : part.transportation === 'PUBLIC' ? (
                        clientWidth && clientWidth <= 768 ? (
                          <svg width="50" height="50" viewBox="0 0 100 75">
                            <Sub className="mr-[12px] desktop:mr-[24px]" />
                          </svg>
                        ) : (
                          <Sub className="mr-[12px] desktop:mr-[24px]" />
                        )
                      ) : clientWidth && clientWidth <= 768 ? (
                        <svg width="50" height="50" viewBox="0 0 100 75">
                          <Car className="mr-[12px] desktop:mr-[24px]" />
                        </svg>
                      ) : (
                        <Car className="mr-[12px] desktop:mr-[24px]" />
                      )}
                    </div>
                    {/* 내보내기 버튼 활성화 시 팝업 */}
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
    </div>
  );
};

export default ParticipationList;

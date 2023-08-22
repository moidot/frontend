import Master from '../../../public/assets/participate/icon_master.svg';
import KakaoTalk from '../../../public/assets/participate/icon_kakao_talk.svg';
import Copy from '../../../public/assets/participate/icon_copy.svg';
import Car from '../../../public/assets/transportation/icon_car.svg';
import Sub from '../../../public/assets/transportation/icon_sub.svg';

export interface participationsProps {
  participationId: number;
  userId: number;
  userName: string;
  locationName: string;
  transportation: string;
}

export interface participantsByRegionProps {
  regionName: string;
  participations: participationsProps[];
}

export interface participationProps {
  groupId: number;
  adminId: number;
  name: string;
  date: string;
  participantsByRegion: participantsByRegionProps[];
}

export interface participationDataProps {
  data: participationProps;
  role: string;
}

const ParticipationList = ({ data, role }: participationDataProps) => {
  const currentLoginUserId: number = 13;
  return (
    <div className="max-w-[1200px]">
      <div className="text-center mt-10">
        <div className="text-h1 font-bold text-font_black">{data.name}</div>
        <div className="text-h3 font-bold text-font_gray">{data.date}</div>
      </div>
      <div className="w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <div className="flex w-[440px] justify-between items-center text-b3 text-font_black mx-auto">
          <div className="flex items-center cursor-pointer text-b2">
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
        {role === 'leader' && (
          <button
            type="button"
            className="absolute right-0 w-[155px] h-[54px] bg-bg_orange rounded-2xl text-b2 text-alert_delete">
            내보내기
          </button>
        )}
        {data.participantsByRegion &&
          data.participantsByRegion.map((item: participantsByRegionProps, index: number) => (
            <div className="mt-[72px]" key={index}>
              <div className="flex justify-between mb-5">
                <div className="max-w-[265px] px-[32px] py-[8px] rounded-[53px] bg-main_orange text-b1 text-white font-bold">
                  {item.regionName}
                </div>
              </div>
              {item.participations &&
                item.participations.map((part: participationsProps) =>
                  currentLoginUserId === part.userId ? (
                    <div
                      key={part.participationId}
                      className="flex justify-between w-full h-[100px] items-center bg-disabled_orange rounded-2xl pl-[24px] font-bold text-font_black mb-4">
                      <div className="flex items-center text-b1">
                        {data.adminId === part.userId && <Master className="mr-2" />}
                        <span>{part.userName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-font_gray font-light pr-4 text-b2">{part.locationName}</span>
                        {part.transportation === 'PUBLIC' ? (
                          <Sub className="mr-[24px]" />
                        ) : (
                          <Car className="mr-[24px]" />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={part.participationId}
                      className="flex justify-between w-full h-[100px] items-center bg-bg_orange rounded-2xl pl-[24px] font-bold text-font_black mb-4">
                      <div className="flex items-center text-b1">
                        {data.adminId === part.userId && <Master className="mr-2" />}
                        <span>{part.userName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-font_gray font-light pr-4 text-b2">{part.locationName}</span>
                        {part.transportation === 'PUBLIC' ? (
                          <Sub className="mr-[24px]" />
                        ) : (
                          <Car className="mr-[24px]" />
                        )}
                      </div>
                    </div>
                  ),
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ParticipationList;

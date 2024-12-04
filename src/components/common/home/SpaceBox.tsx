import { GetParticipateProps } from '@/types/SpaceType';
import LocationIcon from '../../../../public/assets/home/icons/location.svg';
import PeopleIcon from '../../../../public/assets/home/icons/people.svg';

const SpaceBox = ({
  groupName,
  groupDate,
  groupParticipates,
  participantNames,
  bestPlaceNames,
}: GetParticipateProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center rounded-t-2xl px-5 tablets:px-10  bg-main_orange xl:w-[30.5vw] h-[50px] tablets:h-[86px] ">
        <div className="text-h3 tablets:text-h1 font-bold text-font_black">{groupName}</div>
        <div className="text-h4 tablets:text-h3 font-bold text-font_gray">{groupDate}</div>
      </div>
      <div className="flex flex-col rounded-b-2xl p-4 tablets:p-10 bg-white xl:w-[30.5vw] lg:gap-[18px]">
        <div className="gap-[8px]">
          <div className="flex flex-row gap-[8px]">
            <LocationIcon />
            <div className="font-Pretendard text-font_gray text-mobile_b3 tablets:text-b2 font-thin mb-[12px]">
              모임장소
            </div>
          </div>
          <div className="bg-light_orange rounded-[16px] flex flex-row p-4 gap-[12px]">
            <div className="font-Pretendard text-main_orange text-mobile_b4 tablets:text-b2 font-bold">
              {bestPlaceNames[0]}
            </div>
            <div className="font-Pretendard text-font_gray text-mobile_b4 tablets:text-b2 font-bold">
              {bestPlaceNames[1]}
            </div>
            <div className="font-Pretendard text-font_gray text-mobile_b4 tablets:text-b2 font-bold">
              {bestPlaceNames[2]}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-3">
          <div className="flex flex-row gap-[8px] items-center">
            <PeopleIcon />
            <div className="font-Pretendard text-font_gray text-mobile_b3 tablets:text-b2 font-thin">참여인원</div>
            <div className="font-Pretendard text-black text-mobile_b2 tablets:text-b2 font-bold">
              {groupParticipates}
            </div>
          </div>
          <div className="bg-light_orange rounded-[16px] flex flex-row p-4 gap-[12px]">
            {participantNames.map((item) => (
              <div
                key={participantNames.indexOf(item)}
                className="font-Pretendard text-black font-bold text-mobile_b4 tablets:text-b3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpaceBox;

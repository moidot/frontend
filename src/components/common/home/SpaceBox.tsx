import { GetParticipateProps } from '@/types/SpaceType';
import LocationIcon from '../../../../public/assets/home/icons/location.svg';
import PeopleIcon from '../../../../public/assets/home/icons/people.svg';

const SpaceBox = ({ groupName, groupDate, groupParticipates, participantNames }: GetParticipateProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg p-3 bg-main_orange w-[585px] h-[86px] ">
        <div className="font-Pretendard text-white text-h3 font-bold">{groupName}</div>
        <div className="font-Pretendard text-white text-b2 font-thin">{groupDate}</div>
      </div>
      <div className="flex flex-col rounded-bl-lg rounded-br-lg p-10 bg-white w-[585px] gap-[18px]">
        <div className="gap-[8px]">
          <div className="flex flex-row gap-[8px]">
            <LocationIcon />
            <div className="font-Pretendard text-font_gray text-b2 font-thin">모임장소</div>
          </div>
          {/* <div className="bg-light_orange rounded-[16px] flex flex-row p-2 gap-[12px]">
            <div className="font-Pretendard text-main_orange text-h3 font-bold">{bestPlaceName[0]}</div>
            <div className="font-Pretendard text-font_gray text-h3 font-bold">{bestPlaceName[1]}</div>
            <div className="font-Pretendard text-font_gray text-h3 font-bold">{bestPlaceName[2]}</div>
          </div> */}
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-[8px]">
            <PeopleIcon />
            <div className="font-Pretendard text-font_gray text-b2 font-thin">참여인원</div>
            <div className="font-Pretendard text-black text-b2 font-bold">{groupParticipates}</div>
          </div>
          <div className="bg-light_orange rounded-[16px] flex flex-row p-[20px] gap-[12px]">
            {participantNames.map((item) => (
              <div key={participantNames.indexOf(item)} className="font-Pretendard text-black font-bold">
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

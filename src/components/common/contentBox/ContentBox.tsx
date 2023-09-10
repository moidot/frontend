import Location from '@assets/home/spaceCard/location.svg';
import People from '@assets/home/spaceCard/people.svg';
// import Lead from '@assets/home/spaceCard/lead.svg';

const ContentBox = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-[585px] h-[86px] bg-main_orange rounded-tl-lg rounded-tr-lg pb-20 pt-10 pl-10">
          <div className="flex flex-row items-center">
            <div className="font-Pretendard text-white text-h3 font-bold  ">모이닷 팀 프로젝트</div>
          </div>
        </div>
        <div className="w-[585px] h-[286px] bg-white p-10 rounded-bl-lg rounded-br-lg">
          {/*모임장소*/}
          <div className="flex flex-row gap-[30px] items-center">
            <Location />
            <div className="font-Pretendard text-font_gray text-b2 font-regular">모임장소</div>
          </div>
          {/*참여인원*/}
          <div className="flex flex-row gap-[25px] items-center">
            <People />
            <div className="font-Pretendard text-font_gray text-b2 font-regular">참여인원</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContentBox;

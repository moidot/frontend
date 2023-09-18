import AdminBox from '../common/main/AdminBox';
import OthersBox from '../common/main/OthersBox';

const RecommendationItem = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-tl-lg rounded-tr-lg p-3 bg-main_orange w-[1200px] h-[96px] ">
        <div className="font-Pretendard text-white text-h3 font-bold">성신여대입구역</div>
      </div>
      <div className="grid grid-cols-2 w-[100%]  p-10 gap-[20px]">
        <AdminBox name="정민" time={68} money="12" transportType="SUBWAY" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
        <OthersBox name="정민" time={68} money="12" transportType="TAXI" />
      </div>
    </div>
  );
};
export default RecommendationItem;

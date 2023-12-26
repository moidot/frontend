interface PlaceDetailPriceProps {
  menu: string[];
}
const PlaceDetailPrice = ({ menu }: PlaceDetailPriceProps) => {
  return (
    <div className="w-[1112px] h-[236px] bg-bg_orange flex justify-center items-center pt-[92px] pb-[92px] pl-[400px] pr-[400px]">
      {menu ? (
        <div></div>
      ) : (
        <div className="">
          <div className="font-thin font-Pretendard text-main_orange text-b4 ">
            모이닷 팀이 열심히 컨텐츠를 준비하고 있어요!
          </div>
        </div>
      )}
    </div>
  );
};
export default PlaceDetailPrice;

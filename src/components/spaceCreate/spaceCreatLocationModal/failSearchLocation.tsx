import EmptyPlaceImg from '@assets/map/empty_place.svg';

const FailSearchLocation = () => {
  return (
    <div className="font-Pretendard py-10 mx-auto text-center">
      <div className="text-font_black text-b2">앗, 위치를 발견할 수 없어요!</div>
      <div className="my-5 mx-auto w-[300px]">
        <EmptyPlaceImg />
      </div>
      <div className="text-font_gray">
        <div>정확한 위치 혹은 장소명을</div>
        <div>검색해주세요</div>
      </div>
    </div>
  );
};

export default FailSearchLocation;

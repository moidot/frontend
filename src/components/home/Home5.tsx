import EmptyState from '@assets/home/illust_empty_state.svg';

const Home5 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[60px] bg-light_orange w-screen mt-24">
      <div className="flex flex-col justify-center items-center gap-[2px] mt-10">
        <div className="font-Pretendard text-black text-h3 font-bold ">나의 모이닷 스페이스</div>
        <div className="font-Pretendard text-font_gray text-b3 font-regular ">
          과거에 진행되었던 모임장소 조율이에요.
        </div>
      </div>
      <EmptyState />
      <div className="flex flex-col justify-center items-center gap-[4px] mb-24">
        <div className="font-Pretendard text-font_gray text-b3 font-regular ">모이닷 스페이스가 없어요.</div>
        <div className="font-Pretendard text-font_gray text-b3 font-regular ">모임원들과 장소조율을 시작해보세요!</div>
      </div>
    </div>
  );
};
export default Home5;

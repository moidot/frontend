import StartButton from '../common/buttom/home/StartButton';

const Home4 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center">
        <div className="font-Pretendard text-black text-h2 font-bold ">모임장이 되어</div>
        <div className="font-Pretendard text-black text-h2 font-bold ">모임원들과 장소를 정해보세요!</div>
      </div>
      <StartButton />
    </div>
  );
};
export default Home4;

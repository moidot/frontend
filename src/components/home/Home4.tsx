import StartButton from '../common/button/home/StartButton';
import { useRouter } from 'next/router';

const Home4 = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/create');
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10 p-4">
      <div className="flex flex-col justify-center items-center pt-16">
        <div className="font-Pretendard text-black text-h3 font-bold ">모임장이 되어</div>
        <div className="font-Pretendard text-black text-h3 font-bold ">모임원들과 장소를 정해보세요!</div>
      </div>
      <div onClick={onClick}>
        <StartButton />
      </div>
    </div>
  );
};
export default Home4;

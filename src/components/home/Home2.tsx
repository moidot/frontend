import Talk1 from '@assets/home/talk/graphic_talk1.svg';
import Talk2 from '@assets/home/talk/graphic_talk2.svg';
import Union from '@assets/home/talk/Union.svg';
import Keywords from '@assets/home/keywords/keywords.svg';

const Home2 = () => {
  return (
    <>
      {/* part2 : 모이닷 소개 */}
      <div className="bg-light_orange w-screen mt-20 overflow-scroll">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <Talk1 />
            <Talk2 />
            <Union />
            <div className="flex flex-col justify-center items-center gap-2">
              <Keywords />
              <div className="font-Pretendard text-font_gray text-b1 font-regular">
                모임장소를 정하는 것이 어렵다면?
              </div>
              <div className="font-Pretendard text-black text-h1 font-bold">모이닷에서 편하게 정해보세요!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2;

import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import { useRouter } from 'next/router';

const VoteEndPopup = () => {
  const router = useRouter();
  const closeExitPopup = () => {
    router.push('/vote'); // 나의 모이닷 스페이스 url로 이동
  };
  return (
    <CommonPopupBackground>
      <div className="flex justify-center h-[100vh] items-center font-Pretendard">
        <div className="w-[790px] h-[320px] rounded-2xl bg-white ">
          <div className="text-h3 mt-[40px] text-center text-font_black font-bold whitespace-pre">
            투표를 정말 종료할까요?
          </div>
          <div className="text-b2 text-font_gray text-center mt-[20px] mb-[50px]">
            투표를 종료하게 되면 더 이상 투표 진행 및 수정이 불가해요.
          </div>
          <div className="flex w-[585px] justify-between items-center mx-auto mb-[16px]">
            <div className="flex justify-center items-center w-[277px] h-[78px] rounded-2xl border-2 border-main_orange mx-auto text-main_orange text-b2 cursor-pointer">
              취소하기
            </div>
            <div
              onClick={closeExitPopup}
              className="flex justify-center items-center w-[277px] h-[78px] rounded-2xl bg-main_orange mx-auto text-white text-b2 cursor-pointer">
              투표 종료하기
            </div>
          </div>
        </div>
      </div>
    </CommonPopupBackground>
  );
};

export default VoteEndPopup;

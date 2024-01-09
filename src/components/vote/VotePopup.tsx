import CommonPopupBackground from '../common/popup/CommonPopupBackground';
import UrlButton from '../common/button/url';
import { useRouter } from 'next/router';

const VotePopup = () => {
  const title = '투표가 시작되었어요!\n공유하여 모두에게 알려주세요.';
  const router = useRouter();
  const closeExitPopup = () => {
    router.push('/vote/detail'); // 나의 모이닷 스페이스 url로 이동
  };
  return (
    <CommonPopupBackground>
      <div className="flex justify-center h-[100vh] items-center font-Pretendard">
        <div className="w-[790px] h-[367px] rounded-2xl bg-white ">
          <div className="text-h3 my-[33px] text-center text-font_black font-bold whitespace-pre">{title}</div>
          <div className="w-[585px] h-[68px] rounded-2xl bg-bg_orange mx-auto flex items-center mb-[16px]">
            <UrlButton pathname={router?.asPath} />
          </div>
          <div onClick={closeExitPopup}>
            <div className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl mx-auto mb-[92px] text-white text-b1 font-bold">
              투표 하러가기
            </div>
          </div>
        </div>
      </div>
    </CommonPopupBackground>
  );
};

export default VotePopup;

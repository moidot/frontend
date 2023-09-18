import Copy from '@assets/participate/icon_copy.svg';
import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';

const ShareButton = () => {
  return (
    <>
      <div className="w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <div className="flex w-[440px] justify-between items-center text-b3 text-font_black mx-auto">
          <div className="flex items-center cursor-pointer text-b2">
            URL 복사하기
            <Copy className="ml-2" />
          </div>
          <div className="w-[1px] h-[26px] bg-bg_light_gray"></div>
          <div className="flex items-center cursor-pointer text-b2">
            카카오톡 공유하기
            <KakaoTalk className="ml-2" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareButton;

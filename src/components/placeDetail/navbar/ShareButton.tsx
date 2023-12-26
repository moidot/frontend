import Copy from '@assets/participate/icon_copy.svg';
import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';

const ShareButton = () => {
  return (
    <>
      <div className="flex gap-[24px] text-b3 text-font_black ">
        <div className="flex items-center cursor-pointer text-b4">
          URL 복사하기
          <Copy className="ml-2" />
        </div>
        <div className="w-[1px] h-[26px] bg-bg_light_gray"></div>
        <div className="flex items-center cursor-pointer text-b4">
          카카오톡 공유하기
          <KakaoTalk className="ml-2" />
        </div>
      </div>
    </>
  );
};
export default ShareButton;

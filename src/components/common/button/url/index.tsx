import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';
import Copy from '@assets/participate/icon_copy.svg';
import { handleCopyClipBoard } from '@/utils/copyUrl';

const UrlButton = () => {
  const location = { pathname: 'https://www.moidot.kr' }; // 배포 url로 변경하기
  return (
    <div className="flex w-[440px] justify-between items-center text-b3 text-font_black mx-auto">
      <div
        className="flex items-center cursor-pointer text-b2"
        onClick={() => handleCopyClipBoard(`${location.pathname}`)}>
        URL 복사하기
        <Copy className="ml-2" />
      </div>
      <div className="w-[1px] h-[26px] bg-bg_light_gray"></div>
      <div className="flex items-center cursor-pointer text-b2">
        카카오톡 공유하기
        <KakaoTalk className="ml-2" />
      </div>
    </div>
  );
};

export default UrlButton;

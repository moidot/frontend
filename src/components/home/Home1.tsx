import LogoComponent from '@assets/home/logo_.svg';

import KakaoLoginButton from '../common/button/kakao/KakaoButton';
import GoogleLoginButton from '../common/button/google/GoogleButton';
import NaverLoginButton from '../common/button/naver/NaverButton';

const Home1 = () => {
  let clientWidth: any;

  if (typeof document !== 'undefined') {
    clientWidth = document.documentElement.clientWidth;
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center gap-[60px] tablets:mt-[100px]">
      {/* part1 : logo 및 소셜로그인 */}
      {clientWidth && clientWidth <= 480 ? (
        <svg width="300" height="300" viewBox="0 0 400 150">
          <LogoComponent />
        </svg>
      ) : (
        <LogoComponent />
      )}

      <div className="flex flex-col tablets:gap-3">
        <GoogleLoginButton />
        <KakaoLoginButton />
        <NaverLoginButton />
      </div>
      {/* <LogoComponent /> */}
      <div className="flex flex-col items-center justify-center w-screen desktop:w-[585px] h-[137px] bg-light_orange rounded-2xl gap-8">
        <div className="font-Pretendard text-main_orange text-b2 font-bold">왜 소셜로그인으로 로그인하나요?</div>
        <div className="font-Pretendard text-font_gray text-b3 font-regular text-center p-1">
          모이닷은 여러분들의 모임관리가 수월하도록 장소 조율 내역을 저장하기 때문에 소셜로그인이 필요합니다. 히스토리
          저장 외의 목적으로 개인정보를 수집하지 않습니다.
        </div>
      </div>
    </div>
  );
};
export default Home1;

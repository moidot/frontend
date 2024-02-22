import KakaoLogin from '@assets/home/kakao/btn_login.svg';
import { useRouter } from 'next/router';

const KakaoLoginButton = () => {
  const router = useRouter();
  const REST_API_KEY = 'da98b670c28171c6bae91e1f6fa272c3';
  const REDIRECT_URI = 'https://www.moidot.co.kr/login/kakao';
  const LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  function kakaoLogin() {
    router.push(LINK);
  }
  return (
    <div onClick={kakaoLogin}>
      <KakaoLogin />
    </div>
  );
};

export default KakaoLoginButton;

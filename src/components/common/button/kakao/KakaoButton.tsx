import KakaoLogin from '@assets/home/kakao/btn_login.svg';
import { useRouter } from 'next/router';
import { Link } from 'react-router-dom';

const KakaoLoginButton = () => {
  const router = useRouter();
  const REST_API_KEY = 'da98b670c28171c6bae91e1f6fa272c3';
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  let clientWidth: any;

  if (typeof document !== 'undefined') {
    clientWidth = document.documentElement.clientWidth;
  }

  function kakaoLogin() {
    console.log('LINK', LINK);
    router.push(LINK);
  }
  return (
    <div onClick={kakaoLogin} className="mx-auto">
      {clientWidth && clientWidth <= 480 ? (
        <svg width="330" height="50" viewBox="0 0 590 70">
          <KakaoLogin />
        </svg>
      ) : (
        <KakaoLogin />
      )}
    </div>
  );
};

export default KakaoLoginButton;

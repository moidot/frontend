import { useRouter } from 'next/router';
import NaverLogin from '@assets/home/naver/btn_login.svg';

const NaverLoginButton = () => {
  const router = useRouter();
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const LINK = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${REDIRECT_URI}`;
  let clientWidth: any;

  if (typeof document !== 'undefined') {
    clientWidth = document.documentElement.clientWidth;
  }

  function naverLogin() {
    router.push(LINK);
  }
  return (
    <div onClick={naverLogin}>
      {clientWidth && clientWidth <= 480 ? (
        <svg width="330" height="50" viewBox="0 0 590 70">
          <NaverLogin />
        </svg>
      ) : (
        <NaverLogin />
      )}
    </div>
  );
};

export default NaverLoginButton;

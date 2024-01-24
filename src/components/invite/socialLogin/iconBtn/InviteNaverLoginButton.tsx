import { useRouter } from 'next/router';
import NaverLogin from '@assets/home/naver/btn_login.svg';

const InviteNaverLoginButton = () => {
  const router = useRouter();
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const LINK = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${'test'}&redirect_uri=${REDIRECT_URI}`;

  function naverLogin() {
    router.push(LINK);
  }
  return (
    <div onClick={naverLogin}>
      <NaverLogin />
    </div>
  );
};

export default InviteNaverLoginButton;

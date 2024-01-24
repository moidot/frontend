import { useRouter } from 'next/router';
import GoogleLogin from '@assets/home/google/btn_login.svg';

const InviteGoogleLoginButton = () => {
  const router = useRouter();
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const LINK = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;

  function googleLogin() {
    router.push(LINK);
  }
  return (
    <div onClick={googleLogin}>
      <GoogleLogin />
    </div>
  );
};

export default InviteGoogleLoginButton;

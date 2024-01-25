import { deleteAuthLogout } from '@/apis/deleteAuthLogout';
import api from '@/services/TokenService';
import LogoComponent from '@assets/header/logo.svg';
import { useRouter } from 'next/router';
const Header = () => {
  const token = api.getToken();
  const router = useRouter();
  const onClick = () => {
    if (token != undefined) {
      router.push('/user');
    } else {
      router.push('/');
    }
  };

  const onClickLogout = async () => {
    const log = await deleteAuthLogout(token);
    if (log?.message === '성공') api.logout();
    router.push('/');
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-100vw  p-10 " onClick={onClick}>
        <div className="w-36">
          <LogoComponent />
        </div>
        {token !== undefined && (
          <div onClick={onClickLogout} className="font-normal font-Pretendard text-font_gray text-b2">
            로그아웃
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Header;

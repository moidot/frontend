import { deleteAuthLogout } from '@/apis/deleteAuthLogout';
import api from '@/services/TokenService';
import LogoComponent from '@assets/header/logo.svg';
import { useRouter } from 'next/router';
const Header = () => {
  const token = api.getToken();
  const userId = api.getId();
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
      <div className="flex flex-row items-center justify-between w-100vw p-6 tablets:p-10" onClick={onClick}>
        <div className="w-20 tablets:w-36">
          <LogoComponent />
        </div>
        {token && userId ? (
          <div
            onClick={onClickLogout}
            className="font-normal font-Pretendard text-font_gray text-mobile_b3 tablets:text-b2 cursor-pointer">
            로그아웃
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Header;

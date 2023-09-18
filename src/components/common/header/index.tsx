import LogoComponent from '@assets/header/logo.svg';
import { useRouter } from 'next/router';
const Header = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/');
  };
  return (
    <>
      <div className="w-36 h-14 mt-10 ml-20 mb-3" onClick={onClick}>
        <LogoComponent />
      </div>
      <hr />
    </>
  );
};

export default Header;

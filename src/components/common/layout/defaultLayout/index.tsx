import { useRecoilValue } from 'recoil';
import Header from '../../header';
import Navbar from '../../navbar';
import { PropsWithChildren } from 'react';
import { userNavAtom } from '@/states/userNavAtom';
import { Outlet } from 'react-router-dom';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const activeNavType = useRecoilValue(userNavAtom).activeNavType;
  console.log(activeNavType);
  return (
    <>
      <Header />
      <Navbar focusType={activeNavType} />
      {children || <Outlet />}
    </>
  );
};

export default DefaultLayout;

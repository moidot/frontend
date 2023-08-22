import Header from '../../header';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children || <Outlet />}
    </>
  );
};

export default HomeLayout;

import Header from '../../header';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children || <Outlet />}
      <Footer />
    </>
  );
};

export default HomeLayout;

import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';
import { NAV_LIST } from '@/components/common/navbar/Navigation';

export default function Home() {
  return (
    <>
      <Header />
      <Navbar focusType={NAV_LIST.PARTICIPANT} />
    </>
  );
}

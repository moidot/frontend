import HomeLayout from '@/components/common/layout/homeLayout';
//import LoginAfter from '@/components/home/LoginAfter';
import LoginBefore from '@/components/home/LoginBefore';

const HomePage = () => {
  return (
    <>
      <HomeLayout>
        <LoginBefore />
      </HomeLayout>
    </>
  );
};
export default HomePage;

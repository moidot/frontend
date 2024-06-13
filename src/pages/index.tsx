import HomeLayout from '@/components/common/layout/homeLayout';
//import LoginAfter from '@/components/home/LoginAfter';
import LoginBefore from '@/components/home/LoginBefore';
import api from '@/services/TokenService';
import UserHomePage from './user';

const HomePage = () => {
  const token = api.getToken();
  const userId = api.getId();
  console.log('t', token);
  return (
    <>
      {token && userId ? (
        <UserHomePage />
      ) : (
        <HomeLayout>
          <LoginBefore />
        </HomeLayout>
      )}
    </>
  );
};
export default HomePage;

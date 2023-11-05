import HomeLayout from '@/components/common/layout/homeLayout';
import LoginAfter from '@/components/home/LoginAfter';
import LoginBefore from '@/components/home/LoginBefore';
import api from '@/services/TokenService';
const HomePage = () => {
  const token = api.getToken();
  console.log(token);
  return (
    <>
      {token ? (
        <HomeLayout>
          <LoginAfter />
        </HomeLayout>
      ) : (
        <HomeLayout>
          <LoginBefore />
        </HomeLayout>
      )}
    </>
  );
};
export default HomePage;

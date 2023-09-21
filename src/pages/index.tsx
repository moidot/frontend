import HomeLayout from '@/components/common/layout/homeLayout';
import LoginBefore from '@/components/home/LoginBefore';
import api from '@/services/TokenService';
const HomePage = () => {
  const token = api.getToken();
  console.log(token);
  return (
    <>
      <HomeLayout>
        <LoginBefore />
      </HomeLayout>
    </>
  );
};
export default HomePage;

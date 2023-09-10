import api from '@/services/TokenService';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home4 from './Home4';
import Home5NoneLogin from './Home5NoneLogin';
import Home5Login from './Home5Login';

const Home = () => {
  const token = api.getToken();
  return (
    <div className="h-100% w-screen flex flex-col items-center justify-center first-letter:overflow-scroll">
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      {token == null ? <Home5NoneLogin /> : <Home5Login />}
    </div>
  );
};
export default Home;

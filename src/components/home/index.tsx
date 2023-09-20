import api from '@/services/TokenService';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home4 from './Home4';
import Home5 from './Home5';

const Home = () => {
  const token = api.getToken();
  console.log(token);
  return (
    <div className="h-100% w-screen flex flex-col items-center justify-center first-letter:overflow-scroll">
      {token == undefined ? (
        <div>
          <Home1 />
          <Home2 />
          <Home3 />
        </div>
      ) : (
        <div>
          <Home4 />
          <Home5 />
        </div>
      )}
    </div>
  );
};
export default Home;

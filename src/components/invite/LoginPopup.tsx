import CommonPopupBackground from '../common/popup/CommonPopupBackground';
import CloseBtn from '@assets/vote/icon_close_popup.svg';
import LoginBox from './socialLogin/LoginBox';

const LoginPopup = ({ setClickPlus }: any) => {
  return (
    <div className="relative">
      <CommonPopupBackground>
        <div className="w-[790px] h-[921px] absolute bg-white -translate-x-1/2 left-[50%] bottom-0 border-2 rounded-t-2xl">
          <div className="absolute top-10 right-10" onClick={() => setClickPlus(false)}>
            <CloseBtn />
          </div>
          <LoginBox />
        </div>
      </CommonPopupBackground>
    </div>
  );
};

export default LoginPopup;

import { useRouter } from 'next/router';
import UrlButton from '../url';

const ShareButton = ({ teamname }: any) => {
  const locationUrl = useRouter();
  return (
    <>
      <div className="font-Pretendard w-[80vw] desktop:w-[555px] bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-mobile_b3 desktop:text-b1 font-bold mb-[15px]">
          모임원을 초대해보세요!
        </div>
        <UrlButton pathname={locationUrl?.asPath} teamname={teamname} />
      </div>
    </>
  );
};
export default ShareButton;

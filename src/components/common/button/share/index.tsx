import { useRouter } from 'next/router';
import UrlButton from '../url';

const ShareButton = () => {
  const locationUrl = useRouter();
  return (
    <>
      <div className="w-[555px] font-Pretendard bg-bg_orange rounded-2xl text-center mx-auto mt-[30px] mb-[48px] p-[15px]">
        <div className="text-main_orange text-b1 font-bold mb-[15px]">모임원을 초대해보세요!</div>
        <UrlButton pathname={locationUrl?.asPath} />
      </div>
    </>
  );
};
export default ShareButton;

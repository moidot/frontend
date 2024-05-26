import FooterLogo from '@assets/footer/logo.svg';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const onTermsClick = () => {
    router.push('/terms');
  };
  const onPersonalTermsClick = () => {
    router.push('/personalTerms');
  };
  const onLocationTermsClick = () => {
    router.push('/locationTerms');
  };
  return (
    <>
      <div className="w-full h-[240px] bg-[#333333] p-5 desktop:p-20 overflow-auto scrollbar-hide">
        <div className="flex flex-col tablets:flex-row justify-between">
          <div>
            <div className=" mx-auto flex flex-col tablets:flex-row items-center gap-4 desktop:gap-[32px]">
              <div className="font-normal font-Pretendard text-white text-b2 cursor-pointer" onClick={onTermsClick}>
                이용약관
              </div>
              <div className="font-normal font-Pretendard text-white text-b2 hidden tablets:visible">|</div>
              <div
                className="font-normal font-Pretendard text-white text-b2 cursor-pointer"
                onClick={onPersonalTermsClick}>
                개인정보 수집 및 처리방침
              </div>
              <div className="font-normal font-Pretendard text-white text-b2 hidden tablets:visible">|</div>
              <div
                className="font-normal font-Pretendard text-white text-b2 cursor-pointer"
                onClick={onLocationTermsClick}>
                위치정보 수집 및 활용방침
              </div>
              <div className="font-normal font-Pretendard text-white text-b2 hidden tablets:visible">|</div>
              <div className="font-normal font-Pretendard text-white text-b2 cursor-pointer">소개</div>
              <div className="font-normal font-Pretendard text-white text-b2 hidden tablets:visible">|</div>
              <div className="font-normal font-Pretendard text-white text-b2 cursor-pointer">Instagram</div>
            </div>

            <div className="font-normal font-Pretendard text-[#A1A1A1] text-mobile_b4 tablets:text-b2 mt-4">
              Copyright © 모이닷 All right reserved.
            </div>
          </div>
          <div className="hidden tablets:visible">
            <FooterLogo />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;

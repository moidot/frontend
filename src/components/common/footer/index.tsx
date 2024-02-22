import FooterLogo from '@assets/footer/logo.svg';

const Footer = () => {
  return (
    <>
      <div className="w-screen h-[240px] bg-[#333333] p-20 ">
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex flex-row items-center gap-[32px]">
              <div className="font-normal font-Pretendard text-white text-b2">이용약관</div>
              <div className="font-normal font-Pretendard text-white text-b2">|</div>
              <div className="font-normal font-Pretendard text-white text-b2">개인정보 수집 및 처리방침</div>
              <div className="font-normal font-Pretendard text-white text-b2">|</div>
              <div className="font-normal font-Pretendard text-white text-b2">위치정보 수집 및 활용방침</div>
              <div className="font-normal font-Pretendard text-white text-b2">|</div>
              <div className="font-normal font-Pretendard text-white text-b2">소개</div>
              <div className="font-normal font-Pretendard text-white text-b2">|</div>
              <div className="font-normal font-Pretendard text-white text-b2">Instagram</div>
            </div>

            <div className="font-normal font-Pretendard text-[#A1A1A1] text-b2 mt-4">
              Copyright © 모이닷 All right reserved.
            </div>
          </div>
          <div>
            <FooterLogo />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;

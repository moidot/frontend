import BackBtn from '@assets/participate/btn_back.svg';
import Pencil from '@assets/participate/icon_pencil.svg';
import FocusCar from '@assets/transportation/focus_car.svg';
import DisabledSub from '@assets/transportation/disabled_sub.svg';
import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import { useRouter } from 'next/router';

const MyInfoUpdatePage = () => {
  const router = useRouter();
  return (
    <div>
      {/* 뒤로가기 상단바 */}
      <div className="w-full h-[80px] border border-[#E2E2E2]">
        <div className="flex w-[1200px] h-full items-center mx-auto">
          <BackBtn onClick={() => router.push('/participant')} className="cursor-pointer" />
        </div>
      </div>
      <div className="font-Pretendard w-[1200px] mx-auto pt-9">
        <div className="w-[290px] mx-auto mb-[56px]">
          <div className="text-h2 text-font_black font-bold">내 정보 수정하기</div>
          <div className="text-b2 text-font_black pl-1">
            <span>모이닷 팀 프로젝트</span>
            <span className="pl-[16px] text-font_gray">2023.02.01</span>
          </div>
        </div>
        {/* 닉네임 */}
        <div className="w-[586px] mx-auto mb-[80px]">
          <div className="mb-3">
            <label className="text-b1 text-font_black">닉네임</label>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              value="김모임장"
              className="w-full h-[72px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none"
            />
            <Pencil className="absolute top-5 right-6" />
          </div>
        </div>
        {/* 출발 장소 */}
        <div className="w-[586px] mx-auto mb-[40px]">
          <div className="mb-3">
            <label className="text-b1 text-font_black">출발 위치</label>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              value="성신여자대학교"
              className="w-full h-[72px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none"
            />
            <Pencil className="absolute top-5 right-6" />
          </div>
        </div>
        {/* 이동 수단 */}
        <div className="w-[586px] mx-auto mb-[34px]">
          <div className="mb-3">
            <label className="text-b1 text-font_black">이동수단</label>
          </div>
          <div className="flex relative items-center w-full h-[78px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none mb-3">
            <DisabledSub className="ml-[2px]" />
            <span className="ml-[24px] text-font_black text-b2">대중교통</span>
            <NoCheckBox className="absolute right-4" />
          </div>
          <div className="flex relative items-center w-full h-[78px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none">
            <FocusCar />
            <span className="ml-[24px] text-font_black text-b2">자동차</span>
            <CheckBox className="absolute right-4" />
          </div>
        </div>

        <div className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl mx-auto mb-[92px] text-white text-b1 font-bold">
          내 정보 수정하기
        </div>
      </div>
    </div>
  );
};

export default MyInfoUpdatePage;

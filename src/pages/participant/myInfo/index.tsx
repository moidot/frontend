import Pencil from '@assets/participate/icon_pencil.svg';
import FocusCar from '@assets/transportation/focus_car.svg';
import DisabledCar from '@assets/transportation/disabled_car.svg';
import FocusSub from '@assets/transportation/focus_sub.svg';
import DisabledSub from '@assets/transportation/disabled_sub.svg';
import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import SimpleNav from '@/components/common/navbar/SimpleNav';
import api from '@/services/TokenService';

const MyInfoUpdatePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(api.getName());
  const [userLocation, setUserLocation] = useState(
    (router?.query.address as string)?.length > 0 ? router?.query.address : '',
  );
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isClickedPatch, setIsClickedPatch] = useState<boolean>(false);
  const [inputCount, setInputCount] = useState<number>(
    (router?.query.nickname as string)?.length > 0 ? (router?.query.nickname as string)?.length : 0,
  );
  useEffect(() => {
    router.query.transportation === 'PUBLIC' && setIsPublic(!isPublic);
  }, []);

  const handleUserNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length < 9 && setInputCount(e.target.value.length);
    setUserName(e.target.value);
  };
  const handleUserLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLocation(e.target.value);
  };
  const handleUserNameBtn = () => {
    const target = document.getElementById('name-input');
    target?.focus();
  };
  const closeTeamExitPopup = () => {
    router.push('/participant'); // 나의 모이닷 스페이스 url로 이동
  };
  return (
    <div>
      {/* 뒤로가기 상단바 */}
      <SimpleNav />
      <div className="font-Pretendard w-[1200px] mx-auto pt-9">
        <div className="w-[290px] mx-auto mb-[56px]">
          <div className="text-h2 text-font_black font-bold">내 정보 수정하기</div>
          <div className="text-b2 text-font_black pl-1 text-center">
            <span>{router?.query.teamName}</span>
            <span className="pl-[16px] text-font_gray">{router?.query.date}</span>
          </div>
        </div>
        {/* 닉네임 */}
        <div className="w-[586px] mx-auto mb-[80px]">
          <div className="w-full mb-3 flex justify-between items-center">
            <label className="text-b1 text-font_black">닉네임</label>
            <div className="text-font_gray text-b3">공백포함 {inputCount} / 8자</div>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              id="name-input"
              value={userName}
              onChange={handleUserNameInput}
              maxLength={8}
              className="w-full h-[72px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none"
            />
            <Pencil className="absolute top-5 right-6 cursor-pointer" onClick={handleUserNameBtn} />
          </div>
          {/* 에러메세지 */}
          <div className="font-Pretendard text-alert_delete mt-4"></div>
        </div>
        {/* 출발 장소 */}
        <div className="w-[586px] mx-auto mb-[40px]">
          <div className="mb-3">
            <label className="text-b1 text-font_black">출발 위치</label>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              value={userLocation}
              onChange={handleUserLocationInput}
              disabled
              className="w-full h-[72px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none"
            />
            <Pencil className="absolute top-5 right-6 cursor-pointer" />
          </div>
        </div>
        {/* 이동 수단 */}
        <div className="w-[586px] mx-auto mb-[34px]">
          <div className="mb-3">
            <label className="text-b1 text-font_black">이동수단</label>
          </div>
          <div className="flex relative items-center w-full h-[78px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none mb-3">
            {isPublic ? <FocusSub className="ml-[2px]" /> : <DisabledSub className="ml-[2px]" />}
            <span className="ml-[24px] text-font_black text-b2">대중교통</span>
            {isPublic ? (
              <CheckBox className="absolute right-4 cursor-pointer" />
            ) : (
              <NoCheckBox className="absolute right-4 cursor-pointer" onClick={() => setIsPublic(!isPublic)} />
            )}
          </div>
          <div className="flex relative items-center w-full h-[78px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none">
            {!isPublic ? <FocusCar /> : <DisabledCar />}
            <span className="ml-[24px] text-font_black text-b2">자동차</span>
            {!isPublic ? (
              <CheckBox className="absolute right-4 cursor-pointer" />
            ) : (
              <NoCheckBox className="absolute right-4 cursor-pointer" onClick={() => setIsPublic(!isPublic)} />
            )}
          </div>
        </div>

        <div
          className="cursor-pointer flex w-[585px] h-[78px] items-center justify-center bg-main_orange rounded-2xl mx-auto mb-[92px] text-white text-b1 font-bold"
          onClick={() => {
            setIsClickedPatch(!isClickedPatch);
          }}>
          수정하기
        </div>
        {isClickedPatch && (
          <CommonPopupBackground>
            <div className="flex justify-center h-[100vh] items-center font-Pretendard">
              <div className="w-[790px] h-[367px] rounded-2xl bg-white ">
                <div className="text-h3 my-[33px] text-center text-font_black font-bold">수정이 완료되었습니다.</div>
                <div className="w-[378px] mx-auto text-b2 mb-[12px]">
                  <span className="text-font_gray mr-[24px]">출발위치</span>
                  <span>서울 성북구 보문로34다길 2</span>
                </div>
                <div className="w-[378px] mx-auto text-b2 flex items-center">
                  <span className="text-font_gray mr-[24px]">이동수단</span>
                  <div className="w-[40px] h-auto">
                    {isPublic ? (
                      <FocusSub width="100%" height="100%" viewBox="0 0 50 50" />
                    ) : (
                      <FocusCar className="pt-2" width="100%" height="100%" viewBox="0 0 50 50" />
                    )}
                  </div>
                </div>
                <div className="flex w-[585px] mt-[45px] mx-auto">
                  <button
                    type="button"
                    className="w-full h-[78px] rounded-2xl bg-main_orange text-white text-b1 font-bold flex items-center justify-center"
                    onClick={() => closeTeamExitPopup()}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </CommonPopupBackground>
        )}
      </div>
    </div>
  );
};

export default MyInfoUpdatePage;

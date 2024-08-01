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
import { useRecoilState, useRecoilValue } from 'recoil';
import { myInfoUserAtom } from '@/states/myInfoUserAtom';
import SpaceCreateStartLocationModal from '@/components/spaceCreate/spaceCreatLocationModal';
import { locationSearchAtom } from '@/states/locationSearchAtom';
import { participateIdAtom } from '@/states/participateIdAtom';
import { patchGroupParticipate } from '@/apis/patchGroupParticipate';
import api from '@/services/TokenService';
import { groupIdAtom } from '@/states/groupIdAtom';
import BackButtonBar from '@/components/common/backButtonBar';

const MyInfoUpdatePage = () => {
  const router = useRouter();
  const token = api.getToken();
  const group = useRecoilValue(groupIdAtom);
  const userData = useRecoilValue(myInfoUserAtom);
  const partId = useRecoilValue(participateIdAtom);

  const [name, setName] = useState(userData.nickname);
  const [error, setError] = useState<string>('');

  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [location, setLocation] = useRecoilState(locationSearchAtom);
  const [modalClick, setModalClick] = useState(false);
  const [isPublic, setIsPublic] = useState<boolean>(userData.transportation === 'PUBLIC' ? true : false);
  const [isClickedPatch, setIsClickedPatch] = useState<boolean>(false);

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    // script가 완전히 로드된 후 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(userData.address, function (result: any, status: any) {
          // 정상적으로 검색이 완료된 경우
          if (status === window.kakao.maps.services.Status.OK) {
            setLocation({ location: userData.address, lng: result[0].x, lat: result[0].y });
          }
        });
      });
    };
    //script 완전히 로드된 후 지도 띄우는 코드
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [setLocation, userData.address]);

  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [modalClick]);

  const handleUserNameBtn = () => {
    const target = document.getElementById('name-input');
    target?.focus();
  };

  const closeTeamExitPopup = () => {
    router.push(`/participant/${group.groupId}`); // 나의 모이닷 스페이스 url로 이동
  };

  const onLocationClick = () => {
    setModalClick(true);
  };

  const onNextClick = async () => {
    const postData: any = {
      participateId: partId,
      userName: name,
      locationName: location.location,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lng),
      transportationType: isPublic ? 'PUBLIC' : 'PERSONAL',
    };
    const res = await patchGroupParticipate(token, postData);
    const groupData = res.data;
    console.log(groupData, '수정 후 데이터!!');
    setIsClickedPatch(!isClickedPatch);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    const regex = /^[a-zA-Z0-9가-힣]*$/;

    // regex처리
    if (regex.test(name) == false) {
      setError('부적절한 닉네임입니다 (특수문자)');
    } else {
      setError('');
    }
    // 글자길이
    if (name.length >= 8) {
      setName('');
    }
  };

  const onBackClick = () => {
    router.push(`/participant/${group.groupId}`);
  };
  return (
    <div>
      {/* 뒤로가기 상단바 */}
      <BackButtonBar onClick={onBackClick} />
      <div className="font-Pretendard w-[1200px] mx-auto pt-9">
        <div className="w-[290px] mx-auto mb-[56px]">
          <div className="text-h2 text-font_black font-bold">내 정보 수정하기</div>
          <div className="text-b2 text-font_black pl-1 text-center">
            <span>{router?.query.teamName}</span>
            <span className="pl-[16px] text-font_gray">{router?.query.date}</span>
          </div>
        </div>
        {/* 닉네임 */}
        <div className="w-[586px] mx-auto mb-[40px]">
          <div className="w-full mb-3 flex justify-between items-center">
            <label className="text-b1 text-font_black">닉네임</label>
            <div className="text-font_gray text-b3">공백포함 {name.length} / 8자</div>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              id="name-input"
              value={name}
              onChange={onNameChange}
              maxLength={8}
              className="w-full h-[72px] pl-6 rounded-2xl bg-bg_orange text-b2 text-font_black outline-none"
            />
            <Pencil className="absolute top-5 right-6 cursor-pointer" onClick={handleUserNameBtn} />
          </div>
          {/* 에러메세지 */}
          <div className="font-Pretendard text-alert_delete pt-4">{error}</div>
        </div>
        {/* 출발 장소 */}
        <div className="w-[586px] mx-auto mb-[40px]">
          <div className="flex flex-row items-center mb-[12px]">
            <div className="text-b1 text-font_black">출발 위치</div>
          </div>
          <div className="relative w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-2xl bg-bg_orange flex flex-row items-center justify-between">
            <div className="font-Pretendard text-b2 text-font_black">
              {location.location === '' ? userData.address : location.location}
            </div>
            {modalClick && portalElement ? (
              <SpaceCreateStartLocationModal setModalClick={setModalClick} modalClick={modalClick} />
            ) : (
              <div onClick={onLocationClick}>
                <Pencil className="absolute top-5 right-6 cursor-pointer" />
              </div>
            )}
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
          onClick={onNextClick}>
          수정하기
        </div>
        {/* 팝업 - 임시 데이터 */}
        {isClickedPatch && (
          <CommonPopupBackground>
            <div className="flex justify-center h-[100vh] items-center font-Pretendard">
              <div className="w-[790px] h-[367px] rounded-2xl bg-white ">
                <div className="text-h3 my-[33px] text-center text-font_black font-bold">수정이 완료되었습니다.</div>
                <div className="w-[378px] mx-auto text-b2 mb-[12px]">
                  <span className="text-font_gray mr-[24px]">출발위치</span>
                  <span>{location.location}</span>
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

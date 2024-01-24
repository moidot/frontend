// 2단계: 출발 장소 및 이동수단 설정
import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import { useEffect } from 'react';
import BackButtonBar from '@/components/common/backButtonBar';
import { useState } from 'react';
import LocationIcon from '@assets/create/web_icon_location.svg';
import SpaceCreateStartLocationModal from '../../spaceCreate/spaceCreatLocationModal';
import CarOffIcon from '@assets/create/car_off.svg';
import CarOnIcon from '@assets/create/car_on.svg';
import TransportOffIcon from '@assets/create/transport_off.svg';
import TransportOnIcon from '@assets/create/transport_on.svg';
import CheckBtn from '@assets/create/checkBtn.svg';
import NonCheckBtn from '@assets/create/nonCheckBtn.svg';
import { useRecoilState } from 'recoil';
import { locationSearchAtom } from '@/states/locationSearchAtom';
import api from '@/services/TokenService';
import { useRouter } from 'next/router';
import InviteStep from '../InviteStep';
import SpaceParticipateButton from '@/components/common/spaceParticipateBtn';
import SpaceCreateName from '../spaceCreateName';
import { PostGroupParticipateReq } from '@/types/invite';
import { postGroupParticipate } from '@/apis/postGroupParticipate';

const SpaceCreateMoveInfo = () => {
  const [id, setId] = useState<any>();
  const teamName = sessionStorage.getItem('groupName');
  const token = api.getToken();
  const router = useRouter();
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [modalClick, setModalClick] = useState(false);
  const { data, setCurrent } = useFunnelContext();
  const [location, setLocation] = useRecoilState(locationSearchAtom);
  const [transportClick, setTransportClick] = useState<boolean>(false);
  const [carClick, setCarClick] = useState<boolean>(false);
  const [btnClick, setBtnClick] = useState<'CAR' | 'TRANSPORT'>();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const i = sessionStorage.getItem('groupId');
    if (i !== null) setId(parseInt(i));
  }, [id]);
  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [modalClick]);
  useEffect(() => {
    setLocation({ location: '주소를 입력하세요', lng: '', lat: '' });
  }, []);
  console.log(location.lat, location.lng);

  useEffect(() => {
    if (location != null && btnClick != undefined) {
      setActive(true);
    }
  }, [location, btnClick]);
  const onBackClick = () => {
    setCurrent(<SpaceCreateName />);
  };
  const onLocationClick = () => {
    setModalClick(true);
  };
  const onTransportClick = (params: string) => {
    console.log(params);
    if (params == 'CAR') {
      setBtnClick('CAR');
      setTransportClick(false);
      setCarClick(true);
    } else {
      setBtnClick('TRANSPORT');
      setTransportClick(true);
      setCarClick(false);
    }
  };
  const onNextClick = async () => {
    const postData: PostGroupParticipateReq = {
      groupId: id,
      userName: data?.nickname as string,
      locationName: location.location,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lng),
      transportationType: btnClick == 'CAR' ? 'PERSONAL' : 'PUBLIC',
      password: '',
    };
    const res = await postGroupParticipate(token, postData);
    console.log(res);
    const groupId = res.data.groupId;
    if (res.code == 0) {
      router.push(`/main/${groupId}`);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <BackButtonBar onClick={onBackClick} />
      <div className="h-[43px]"></div>
      <InviteStep activeStep="START_LOCATION" />
      <div className="pt-[34px] flex justify-center items-center flex-col">
        <div className="flex flex-row">
          <div className="font-normal font-Pretendard text-b1 text-main_orange">{teamName}</div>
          <div className="font-normal font-Pretendard text-b1 text-font_gray">에 가기위한 </div>
        </div>
        <div className="font-bold font-Pretendard text-h3 text-font_black">이동정보를 알려주세요 </div>
      </div>
      <div className="pt-[83px] w-[590px] gap-[52px] flex flex-col">
        <div>
          <div className="flex flex-row items-center mb-[12px]">
            <div className="font-normal font-Pretendard text-b1 text-black">출발 위치</div>
          </div>
          <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
            <div className="font-normal font-Pretendard text-b3 text-font_gray">{location.location}</div>
            {modalClick && portalElement ? (
              <SpaceCreateStartLocationModal setModalClick={setModalClick} modalClick={modalClick} />
            ) : (
              <div onClick={onLocationClick}>
                <LocationIcon />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-[12px]">
            <div className="font-normal font-Pretendard text-b1 text-black">이동 수단</div>
            <div className="flex flex-col gap-[12px]">
              <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
                <div>
                  {transportClick ? (
                    <div className="flex flex-row gap-[28px] items-center">
                      <TransportOnIcon />
                      <div className="font-bold font-Pretendard text-b2 text-main_orange">대중교통</div>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-[28px] items-center">
                      <TransportOffIcon />
                      <div className="font-normal font-Pretendard text-b2 text-black">대중교통</div>
                    </div>
                  )}
                </div>

                {btnClick == 'TRANSPORT' ? <CheckBtn /> : <NonCheckBtn onClick={() => onTransportClick('TRANSPORT')} />}
              </div>
              <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
                <div>
                  {carClick ? (
                    <div className="flex flex-row gap-[28px] items-center">
                      <CarOnIcon />
                      <div className="font-bold font-Pretendard text-b2 text-main_orange">자동차</div>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-[28px] items-center">
                      <CarOffIcon />
                      <div className="font-normal font-Pretendard text-b2 text-black">자동차</div>
                    </div>
                  )}
                </div>

                {btnClick == 'CAR' ? <CheckBtn /> : <NonCheckBtn onClick={() => onTransportClick('CAR')} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[45px]">
        <div className="font-normal font-Pretendard text-b3 text-font_gray">
          입력하신 장소정보는 다른 모임원들에게 보여집니다.
        </div>
      </div>

      <div className="pt-[8px]">
        {active ? (
          <SpaceParticipateButton isActive={active} onClick={onNextClick} />
        ) : (
          <SpaceParticipateButton isActive={active} />
        )}
      </div>
    </div>
  );
};
export default SpaceCreateMoveInfo;

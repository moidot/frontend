import { useState } from 'react';
import CloseBtn from '@assets/calendar/close_btn.svg';
import useGeolocation from '@/hooks/useGeolocation';
import { useEffect } from 'react';
import LocationIcon from '@assets/create/web_icon_location.svg';
import { useRecoilState } from 'recoil';
import SearchIcon from '@assets/create/search_btn.svg';
import { getKakaoSearchLocaton } from '@/apis/getKakaoSearchLocation';
import SearchLocationItem from './searchLocationItem';
import { GetKakaoLocationSearchData } from '@/types/create';
import { locationSearchAtom } from '@/states/locationSearchAtom';

interface SpaceCreateStartLocationModalProps {
  modalClick: boolean;
  setModalClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpaceCreateStartLocationModal = ({ modalClick, setModalClick }: SpaceCreateStartLocationModalProps) => {
  const [searchLocationVal, setSearchLocationVal] = useState<string>('');
  const [loadCurrentLocation, setLoadCurrentLocation] = useState<boolean>(false);
  const geolocationInfo = useGeolocation();
  const [searchDataList, setSearchDataList] = useState<GetKakaoLocationSearchData[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useRecoilState(locationSearchAtom);

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    // script가 완전히 로드된 후 실행
    const onLoadKakaoMap = () => {
      console.log(loadCurrentLocation);
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        const coord = new window.kakao.maps.LatLng(geolocationInfo.coordinates?.lat, geolocationInfo.coordinates?.lng);
        let callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK && loadCurrentLocation) {
            const location = result[0].address.address_name;
            const lat = geolocationInfo.coordinates?.lat.toString() as string;
            const lng = geolocationInfo.coordinates?.lng.toString() as string;
            setLocation({ location: location, lat: lat, lng: lng });
            setSearchLocationVal(result[0].address.address_name);
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    };
    //script 완전히 로드된 후 지도 띄우는 코드
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [geolocationInfo.coordinates?.lat, geolocationInfo.coordinates?.lng, loadCurrentLocation, setLocation]);

  const onCloseClick = () => {
    setModalClick(!modalClick);
  };
  const onSearchLocationValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocationVal(event.currentTarget.value);
  };
  const onLoadCurrentLocation = () => {
    setLoadCurrentLocation(true);
  };

  const onSearchEnterKey = async (event: any) => {
    const key: any = event.code;
    if (key === 'Enter') {
      const data = (await getKakaoSearchLocaton(searchLocationVal)).documents.slice(0, 7);
      setSearchDataList(data);
    }
  };

  const onSearchClick = async () => {
    const data = (await getKakaoSearchLocaton(searchLocationVal)).documents.slice(0, 7);
    setSearchDataList(data);
  };

  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10 "
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="w-[790px] max-h-[90vh] pt-[32px] pb-[81px] flex flex-col bg-white z-20 gap-[40px] rounded-2xl overflow-auto scrollbar-hide">
        <div className="flex flex-row justify-center items-center pl-[205px] pr-[44px]">
          <div className="font-bold font-Pretendard text-font_black text-h3">출발 위치를 등록해주세요</div>
          <div onClick={onCloseClick} className="pl-[133px]">
            <CloseBtn />
          </div>
        </div>
        <div className="pl-[102px] pr-[102px]">
          <div className="w-[586px] h-[72px] mt-[53px] rounded-lg p-[20px] bg-bg_orange flex flex-row items-center justify-between outline-none">
            <input
              className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange"
              placeholder="위치를 입력해주세요"
              value={searchLocationVal}
              onChange={onSearchLocationValChange}
              onKeyDown={onSearchEnterKey}
            />
            <div onClick={onSearchClick}>
              <SearchIcon />
            </div>
          </div>
          <div className="pt-[23px]" onClick={onLoadCurrentLocation}>
            <div className="flex flex-row gap-[16px] items-center" onClick={onLoadCurrentLocation}>
              <LocationIcon />
              <div className="font-normal font-Pretendard text-b3 text-main_orange">현재위치 불러오기</div>
            </div>
          </div>
          <div className="w-[586px] h-[8px] bg-bg_orange mt-[22px] mb-[16px]"></div>
          {searchDataList &&
            searchDataList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItemId(item.id);
                  setLocation({
                    location: item.road_address_name,
                    lat: item.y,
                    lng: item.x,
                  });
                }}
                className={`w-[586px] h-[72px] mt-[53px] rounded-lg p-[20px]  flex flex-row items-center justify-between outline-none ${
                  selectedItemId === item.id ? 'bg-bg_orange' : ''
                }`}>
                <SearchLocationItem
                  locationTitle={item.place_name}
                  detailLocation={item.road_address_name}
                  lat={item.y}
                  lng={item.x}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SpaceCreateStartLocationModal;

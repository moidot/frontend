import PlaceDetailInfo from './placeDetailInfo';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import { ChipList } from '../place';
import PlaceNavBar from '../placeDetail/navbar/index';
import { useState } from 'react';
import PlaceDetailLocation from './PlaceDetailLocation';
import PlaceDetailPhoto from './PlaceDetailPhoto';
import PlaceDetailPrice from './PlaceDetailPrice';
import MapMore from '../common/button/map';
import { useRouter } from 'next/router';

export type PLACE_NAV_LIST = 'LOCATION' | 'PRICE' | 'PHOTO';
interface PlaceDetailProps {
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
  setModalClick: React.Dispatch<React.SetStateAction<boolean>>;
  detail: BestRegionPlaceDetailProps;
  category: keyof typeof ChipList;
  lng: string;
  lat: string;
  thumUrls: string[];
  menu: string[];
}
const PlaceDetail = ({
  title,
  thumUrl,
  distance,
  openTime,
  tel,
  setModalClick,
  detail,
  category,
  lng,
  lat,
  thumUrls,
}: PlaceDetailProps) => {
  const [placeNav, setPlaceNav] = useState<PLACE_NAV_LIST>('LOCATION');
  const router = useRouter();
  const handleMapMoreClick = () => {
    router.push(`https://m.map.naver.com/search2/search.naver?query=${title}#/map/1`);
  };

  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10  "
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="display block p-[32px]">
        <div className="rounded-xl w-[1200px] max-h-[90vh] bg-white z-20 pt-[400px] pb-[100px] overflow-scroll flex justify-center items-center flex-col scrollbar-hide ">
          <PlaceDetailInfo
            title={title}
            thumUrl={thumUrl}
            distance={distance}
            openTime={openTime}
            tel={tel}
            setModalClick={setModalClick}
            detail={detail}
            category={category}
          />

          <PlaceNavBar placeNav={placeNav} setPlaceNav={setPlaceNav} />
          {placeNav == 'LOCATION' && (
            <div className="flex justify-center items-center flex-col">
              <PlaceDetailLocation lng={lng} lat={lat} />
              <div className="p-[40px]"></div>
              <div onClick={handleMapMoreClick}>
                <MapMore />
              </div>
            </div>
          )}
          {placeNav == 'PHOTO' && (
            <div>
              <PlaceDetailPhoto thumUrls={thumUrls} />
            </div>
          )}
          {placeNav == 'PRICE' && (
            <div className="pb-[23px]">
              <PlaceDetailPrice />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;

import PlaceDetailInfo from './placeDetailInfo';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import { ChipList } from '../place';
import PlaceNavBar from '../placeDetail/navbar/index';
import { useState } from 'react';
import PlaceLocation from './placeLocation';
import PlacePhoto from './PlacePhoto';
import PlacePrice from './PlacePrice';

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
  lng: number;
  lat: number;
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
}: PlaceDetailProps) => {
  const [placeNav, setPlaceNav] = useState<PLACE_NAV_LIST>('LOCATION');
  console.log(placeNav);
  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10"
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="flex flex-col justify-center items-center rounded-xl w-[1200px] p-20 bg-white z-20">
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
        {placeNav == 'LOCATION' && <PlaceLocation lng={lng} lat={lat} />}
        {placeNav == 'PHOTO' && <PlacePhoto />}
        {placeNav == 'PRICE' && <PlacePrice />}
      </div>
    </div>
  );
};

export default PlaceDetail;

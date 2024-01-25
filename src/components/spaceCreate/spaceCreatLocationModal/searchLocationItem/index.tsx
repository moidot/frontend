import { useState } from 'react';
import StarOnIcon from '@assets/create/star_on.svg';
import StarOffIcon from '@assets/create/start_off.svg';
import { useRecoilState } from 'recoil';
import { locationSearchAtom } from '@/states/locationSearchAtom';
import { useRouter } from 'next/router';

interface SearchLocationItemProps {
  locationTitle: string;
  detailLocation: string;
  lng: string;
  lat: string;
}

const SearchLocationItem = ({ detailLocation, locationTitle, lat, lng }: SearchLocationItemProps) => {
  const [starClick, setStarClick] = useState<boolean>(false);
  const [location, setLocation] = useRecoilState(locationSearchAtom);
  const onStarClick = (locationTitle: string) => {
    setStarClick(!starClick);

    if (!starClick) {
      setLocation({ location: locationTitle, lat: lat, lng: lng });
    } else {
      setLocation({ location: '', lat: '', lng: '' });
    }
  };

  return (
    <div className="w-[586px]   flex flex-row items-center justify-between outline-none">
      <div>
        <div className="font-normal font-Pretendard text-font_black text-b2">{locationTitle}</div>
        <div className="font-normal font-Pretendard text-b3 text-font_gray">{detailLocation}</div>
      </div>
      <div onClick={() => onStarClick(locationTitle)}>{starClick ? <StarOnIcon /> : <StarOffIcon />}</div>
    </div>
  );
};
export default SearchLocationItem;

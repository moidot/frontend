import { useEffect } from 'react';
import StarOnIcon from '@assets/create/star_on.svg';
import StarOffIcon from '@assets/create/start_off.svg';
interface SearchLocationItemProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  starLocation: string;
  setStarLocation: React.Dispatch<React.SetStateAction<string>>;
  locationTitle: string;
  detailLocation: string;
  onStarClick: (val: string) => void;
  starClick: boolean;
  setStarClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchLocationItem = ({
  location,
  detailLocation,
  locationTitle,
  starLocation,
  setStarClick,
  starClick,
  onStarClick,
}: SearchLocationItemProps) => {
  useEffect(() => {
    if (location != starLocation) {
      setStarClick(false);
    }
  }, [starClick]);

  return (
    <div className="w-[586px] h-[72px] mt-[53px] rounded-lg p-[20px] bg-bg_orange flex flex-row items-center justify-between outline-none">
      <div>
        <div className="font-normal font-Pretendard text-font_black text-b2">{locationTitle}</div>
        <div className="font-normal font-Pretendard text-b3 text-font_gray">{detailLocation}</div>
      </div>
      <div onClick={() => onStarClick(locationTitle)}>{starClick ? <StarOnIcon /> : <StarOffIcon />}</div>
    </div>
  );
};
export default SearchLocationItem;

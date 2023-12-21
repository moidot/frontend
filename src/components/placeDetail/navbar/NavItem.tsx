import { useState } from 'react';
import { PLACE_NAV_LIST } from '..';
import { useEffect } from 'react';
type NavListType = PLACE_NAV_LIST;

interface NavItemProps {
  type: NavListType;
  placeNav: PLACE_NAV_LIST;
  setPlaceNav: React.Dispatch<React.SetStateAction<PLACE_NAV_LIST>>;
}

const NavItem = ({ type, placeNav, setPlaceNav }: NavItemProps) => {
  const [label, setLabel] = useState<string>();
  useEffect(() => {
    if (type == 'LOCATION') {
      setLabel('위치');
    } else if (type == 'PHOTO') {
      setLabel('사진');
    } else if (type == 'PRICE') {
      setLabel('가격정보');
    }
  }, [placeNav]);
  const onNavClick = (data: PLACE_NAV_LIST) => {
    setPlaceNav(data);
  };
  return (
    <>
      {type === placeNav ? (
        <div className="w-[131px] h-[29px] text-center ">
          <div className="font-thin font-Pretendard text-main_orange text-b2 ">{label}</div>
          <div className="mt-[7px] w-[131px]  h-0.5 bg-main_orange z-10 absolute"></div>
        </div>
      ) : (
        <div className="w-[131px] h-[29px] text-center cursor-pointer" onClick={() => onNavClick(type)}>
          <div className="font-Pretendard font-thin text-font_gray text-b2">{label}</div>
        </div>
      )}
    </>
  );
};
export default NavItem;

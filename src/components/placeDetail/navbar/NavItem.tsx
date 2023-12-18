import { PLACE_NAV_LIST } from './Navigation';
import { NAV_INFO } from './NavInfo';

type NavListType = keyof typeof PLACE_NAV_LIST;

interface NavItemProps {
  type: NavListType;
  isFocused: boolean;
  setFocusType: React.Dispatch<React.SetStateAction<keyof typeof PLACE_NAV_LIST>>;
}

const NavItem = ({ type, isFocused, setFocusType }: NavItemProps) => {
  const onClick = () => {
    setFocusType(type);
  };
  const { label } = NAV_INFO[type];
  return (
    <>
      {isFocused ? (
        <div className="w-[131px] h-[29px] text-center" onClick={onClick}>
          <div className="font-thin font-Pretendard text-main_orange text-b2">{label}</div>
          <div className="mt-[5px] w-[131px]  h-0.5 bg-main_orange z-10 absolute"></div>
        </div>
      ) : (
        <div className="w-[131px] h-[29px] text-center">
          <div className="font-Pretendard font-thin text-font_gray text-b2">{label}</div>
        </div>
      )}
    </>
  );
};
export default NavItem;

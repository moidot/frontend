import { PLACE_NAV_LIST } from './Navigation';
import NavItem from './NavItem';

interface NavigationBarProps {
  focusType: keyof typeof PLACE_NAV_LIST;
  setFocusType: React.Dispatch<React.SetStateAction<keyof typeof PLACE_NAV_LIST>>;
}

const Navbar = ({ focusType, setFocusType }: NavigationBarProps) => {
  return (
    <>
      <div className="flex mt-10 w-full pl-20 pr-20 gap-[45]">
        <NavItem
          type={PLACE_NAV_LIST.LOCATION}
          isFocused={focusType == PLACE_NAV_LIST.LOCATION}
          setFocusType={setFocusType}
        />
        <NavItem
          type={PLACE_NAV_LIST.PHOTO}
          isFocused={focusType == PLACE_NAV_LIST.PHOTO}
          setFocusType={setFocusType}
        />
        <NavItem
          type={PLACE_NAV_LIST.PRICE}
          isFocused={focusType == PLACE_NAV_LIST.PRICE}
          setFocusType={setFocusType}
        />
      </div>
      <div className="flex justify-center items-center mt-1.5 w-[80%] h-0.5 bg-disabled_orange pl-[44px] pr-[44px] relative "></div>
    </>
  );
};
export default Navbar;

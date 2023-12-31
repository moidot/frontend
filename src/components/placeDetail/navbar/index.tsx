import { PLACE_NAV_LIST } from '..';
import NavItem from './NavItem';
import ShareButton from './ShareButton';

interface NavBarProps {
  placeNav: PLACE_NAV_LIST;
  setPlaceNav: React.Dispatch<React.SetStateAction<PLACE_NAV_LIST>>;
}

const Navbar = ({ placeNav, setPlaceNav }: NavBarProps) => {
  return (
    <div className="w-full flex mt-100 pl-4 pr-4 flex-col mt-10">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row gap-[45]">
          <NavItem type={'LOCATION'} placeNav={placeNav} setPlaceNav={setPlaceNav} />
          <NavItem type={'PHOTO'} placeNav={placeNav} setPlaceNav={setPlaceNav} />
          <NavItem type={'PRICE'} placeNav={placeNav} setPlaceNav={setPlaceNav} />
        </div>
        <ShareButton />
      </div>
      {/* <div className="flex justify-center items-center w-full h-0.5 bg-disabled_orange pl-[44px] pr-[44px] mb-[10px] "></div> */}
    </div>
  );
};
export default Navbar;

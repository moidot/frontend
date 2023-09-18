import { NAV_URL_LIST, NAV_LIST } from './Navigation';
import NavItem from './NavItem';

interface NavigationBarProps {
  focusType: keyof typeof NAV_URL_LIST;
}

const Navbar = ({ focusType }: NavigationBarProps) => {
  return (
    <>
      <div className="flex justify-center items-center mt-10 w-full pl-20 pr-20">
        <NavItem type={NAV_LIST.MAIN} isFocused={focusType == NAV_LIST.MAIN} />
        <NavItem type={NAV_LIST.PARTICIPANT} isFocused={focusType == NAV_LIST.PARTICIPANT} />
        <NavItem type={NAV_LIST.VOTE} isFocused={focusType == NAV_LIST.VOTE} />
      </div>
    </>
  );
};
export default Navbar;

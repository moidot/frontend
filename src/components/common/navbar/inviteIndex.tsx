import { NAV_URL_LIST, NAV_LIST } from './Navigation';
import NavItem from './NavItem';

interface NavigationBarProps {
  focusType: keyof typeof NAV_URL_LIST;
}

const InviteNavbar = ({ focusType }: NavigationBarProps) => {
  const groupId = sessionStorage.getItem('groupId');

  return (
    <>
      <div className="flex justify-center items-center mt-10 w-full pl-20 pr-2 gap-10 ">
        <NavItem type={NAV_LIST.MAIN} isFocused={focusType == NAV_LIST.MAIN} groupId={groupId} />
        <NavItem type={NAV_LIST.INVITE} isFocused={focusType == NAV_LIST.INVITE} groupId={groupId} />
        <NavItem type={NAV_LIST.VOTE} isFocused={focusType == NAV_LIST.VOTE} groupId={groupId} />
      </div>
    </>
  );
};
export default InviteNavbar;

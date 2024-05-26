import { useRecoilValue } from 'recoil';
import { NAV_URL_LIST, NAV_LIST } from './Navigation';
import NavItem from './NavItem';
import { groupIdAtom } from '@/states/groupIdAtom';

interface NavigationBarProps {
  focusType: keyof typeof NAV_URL_LIST;
}

const Navbar = ({ focusType }: NavigationBarProps) => {
  const group = useRecoilValue(groupIdAtom);
  const groupId = group.groupId;

  return (
    <>
      <div className="flex justify-center items-center mt-4 tablets:mt-10 w-full pl-3 tablets:pl-0 pr-2 gap-6 tablets:gap-10">
        <NavItem type={NAV_LIST.MAIN} isFocused={focusType == NAV_LIST.MAIN} groupId={groupId} />
        <NavItem type={NAV_LIST.PARTICIPANT} isFocused={focusType == NAV_LIST.PARTICIPANT} groupId={groupId} />
        <NavItem type={NAV_LIST.VOTE} isFocused={focusType == NAV_LIST.VOTE} groupId={groupId} />
      </div>
    </>
  );
};
export default Navbar;

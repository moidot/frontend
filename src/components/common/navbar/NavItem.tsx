import { NAV_LIST } from './Navigation';
import { NAV_INFO } from './NavInfo';
import Link from 'next/link';

type NavListType = keyof typeof NAV_LIST;

interface NavItemProps {
  type: NavListType;
  isFocused: boolean;
  groupId: number;
}

const NavItem = ({ type, isFocused, groupId }: NavItemProps) => {
  const { url, label } = NAV_INFO[type];
  return (
    <>
      {isFocused && groupId !== null ? (
        <Link href={`${url}/${groupId}`} className="w-[400px] h-[29px] text-center">
          <div className="font-thin font-Pretendard text-main_orange text-b2">{label}</div>
          <div className="mt-1.5 w-full h-0.5 bg-main_orange rounded-2xl"></div>
        </Link>
      ) : (
        <Link href={`${url}/${groupId}`} className="w-[400px] h-[29px] text-center">
          <div className="font-Pretendard font-thin text-font_gray text-b2">{label}</div>
        </Link>
      )}
    </>
  );
};
export default NavItem;

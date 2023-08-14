import { NAV_INFO } from '@/components/common/navbar/NavInfo';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { NAV_LIST } from '@/components/common/navbar/Navigation';

type NavListType = keyof typeof NAV_INFO;
export interface NavAtomProps {
  activeNavType: NavListType;
}

const { persistAtom } = recoilPersist({
  key: 'navLocalStorage',
  storage: localStorage,
});

export const userNavAtom = atom<NavAtomProps>({
  key: 'userNavAtom',
  default: {
    activeNavType: NAV_LIST.PLACE,
  },
  effects_UNSTABLE: [persistAtom],
});

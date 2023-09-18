import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== `undefined` ? window.localStorage : null;
const { persistAtom } = recoilPersist({
  key: 'userInfoLocalStorage',
  storage: localStorage!,
});

export interface UserInfoAtomProps {
  email: string;
  name: string;
}

export const userInfoAtom = atom<UserInfoAtomProps>({
  key: 'userInfoAtom',
  default: {
    email: '',
    name: '',
  },
  effects_UNSTABLE: [persistAtom],
});

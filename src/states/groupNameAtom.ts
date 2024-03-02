import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'gName',
  storage: sessionStorage,
});

export const groupNameAtom = atom<string>({
  key: 'groupNameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

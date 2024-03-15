import { atom } from 'recoil';

export const recommendIndexAtom = atom<number>({
  key: 'recommendIndexAtom',
  default: 0,
});

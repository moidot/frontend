import { atom } from 'recoil';

export const participateIdAtom = atom<number>({
  key: 'participateIdAtom',
  default: 0,
});

import { atom } from 'recoil';

export const groupNameAtom = atom<string>({
  key: 'groupNameAtom',
  default: '',
});

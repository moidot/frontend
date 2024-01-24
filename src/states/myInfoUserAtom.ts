import { atom } from 'recoil';

export interface MyInfoUserAtomProps {
  nickname: string;
  address: string;
  transportation: string;
}
export const myInfoUserAtom = atom<MyInfoUserAtomProps>({
  key: 'currentUserAtom',
  default: {
    nickname: '',
    address: '',
    transportation: '',
  },
});

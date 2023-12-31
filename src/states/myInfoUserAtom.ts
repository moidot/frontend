import { atom } from 'recoil';

export interface MyInfoUserAtomProps {
  nickname: string;
  transportation: string;
}
export const myInfoUserAtom = atom<MyInfoUserAtomProps>({
  key: 'currentUserAtom',
  default: {
    nickname: '',
    transportation: '',
  },
});

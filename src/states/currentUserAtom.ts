import { atom } from 'recoil';

export interface CurrentUserAtomProps {
  name: string;
  email: string;
}
export const currentUserAtom = atom<CurrentUserAtomProps>({
  key: 'currentUserAtom',
  default: {
    name: '김모임장',
    email: 'kim@naver.com',
  },
});

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface GroupIdProps {
  groupId: number;
}
const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'gId',
  storage: sessionStorage,
});
export const groupIdAtom = atom<GroupIdProps>({
  key: 'groupIdAtom',
  default: {
    groupId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

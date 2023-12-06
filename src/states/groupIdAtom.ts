import { atom } from 'recoil';

export interface GroupIdProps {
  groupId: number;
}
export const groupIdAtom = atom<GroupIdProps>({
  key: 'groupIdAtom',
  default: {
    groupId: 22,
  },
});

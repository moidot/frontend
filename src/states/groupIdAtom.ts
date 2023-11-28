import { atom } from 'recoil';

export interface GroupIdProps {
  groupId: string;
}
export const groupIdAtom = atom<GroupIdProps>({
  key: 'groupIdAtom',
  default: {
    groupId: '1',
  },
});

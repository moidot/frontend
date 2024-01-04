import { atom } from 'recoil';

export interface GroupAdminIdProps {
  adminId: string;
}
export const groupAdminIdAtom = atom<GroupAdminIdProps>({
  key: 'groupAdminIdAtom',
  default: {
    adminId: '',
  },
});

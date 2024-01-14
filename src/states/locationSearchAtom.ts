import { atom } from 'recoil';

export const locationSearchAtom = atom({
  key: 'locationSearchAtom',
  default: {
    location: '',
    lat: '',
    lng: '',
  },
});

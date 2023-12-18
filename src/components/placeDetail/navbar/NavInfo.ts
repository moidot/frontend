import { PLACE_NAV_LIST } from './Navigation';

interface NavItemType {
  label: string;
}

export const NAV_INFO = {
  [PLACE_NAV_LIST.LOCATION]: {
    label: '위치',
  },
  [PLACE_NAV_LIST.PHOTO]: {
    label: '사진',
  },
  [PLACE_NAV_LIST.PRICE]: {
    label: '가격정보',
  },
} as const satisfies Record<(typeof PLACE_NAV_LIST)[keyof typeof PLACE_NAV_LIST], NavItemType>;

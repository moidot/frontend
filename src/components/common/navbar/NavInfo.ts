import { NAV_URL_LIST } from './Navigation';
import { NAV_LIST } from './Navigation';

interface NavItemType {
  label: string;
  url: (typeof NAV_URL_LIST)[keyof typeof NAV_URL_LIST]; // NAV_URL_LIST의 value들을 상수처럼 쓰고 싶을 때 이렇게 사용
}

export const NAV_INFO = {
  [NAV_LIST.MAIN]: {
    label: '모임 장소',
    url: NAV_URL_LIST.MAIN,
  },
  [NAV_LIST.PARTICIPANT]: {
    label: '참여 정보',
    url: NAV_URL_LIST.PARTICIPANT,
  },
  [NAV_LIST.VOTE]: {
    label: '투표',
    url: NAV_URL_LIST.VOTE,
  },
} as const;

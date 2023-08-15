export const NAV_LIST = {
  PLACE: 'PLACE',
  PARTICIPANT: 'PARTICIPANT',
  VOTE: 'VOTE',
} as const;
export const NAV_URL_LIST = {
  [NAV_LIST.PLACE]: '/place',
  [NAV_LIST.PARTICIPANT]: '/participant',
  [NAV_LIST.VOTE]: '/vote',
} as const;

export const NAV_LIST = {
  MAIN: 'MAIN',
  PARTICIPANT: 'PARTICIPANT',
  VOTE: 'VOTE',
} as const;
export const NAV_URL_LIST = {
  [NAV_LIST.MAIN]: '/main',
  [NAV_LIST.PARTICIPANT]: '/participant',
  [NAV_LIST.VOTE]: '/vote',
} as const;

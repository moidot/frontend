export const NAV_LIST = {
  MAIN: 'MAIN',
  PARTICIPANT: 'PARTICIPANT',
  VOTE: 'VOTE',
  INVITE: 'INVITE',
} as const;
export const NAV_URL_LIST = {
  [NAV_LIST.MAIN]: '/main',
  [NAV_LIST.PARTICIPANT]: '/participant',
  [NAV_LIST.VOTE]: '/vote',
  [NAV_LIST.INVITE]: '/invite',
} as const;

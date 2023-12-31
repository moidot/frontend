import { ResponseDto } from './common';

export interface ParticipationsProps {
  participationId: number;
  userEmail: string;
  userName: string;
  locationName: string;
  transportation: string;
}

export interface ParticipantsByRegionProps {
  regionName: string;
  participations: ParticipationsProps[];
}

export interface ParticipationProps {
  participations: any;
  groupId: number;
  adminEmail: string;
  name: string;
  date: string;
  participantsByRegion: ParticipantsByRegionProps[];
}

export interface ParticipationDataProps {
  data: ParticipationProps;
  mode: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMode: any;
}

export type GetAllParticipationRes = ResponseDto<ParticipationProps>;

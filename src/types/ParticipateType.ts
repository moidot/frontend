export interface ParticipationsProps {
  participationId: number;
  userId: number;
  userName: string;
  locationName: string;
  transportation: string;
}

export interface ParticipantsByRegionProps {
  regionName: string;
  participations: ParticipationsProps[];
}

export interface ParticipationProps {
  groupId: number;
  adminId: number;
  name: string;
  date: string;
  participantsByRegion: ParticipantsByRegionProps[];
}

export interface ParticipationDataProps {
  data: ParticipationProps;
  role: string;
}

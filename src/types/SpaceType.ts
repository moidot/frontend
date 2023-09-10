import { ResponseDto } from './common';

export interface GetParticipateProps {
  groupId: number;
  groupName: string;
  groupAdminName: string;
  groupDate: string;
  groupParticipates: number;
  confirmPlace: string;
  bestPlaceName: string[];
  participantNames: string[];
}

export type GetUserParticipateListRes = ResponseDto<GetParticipateProps[]>;

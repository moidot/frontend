import { ResponseDto } from './common';

export interface VoteStatusData {
  bestPlaceId: number;
  votes: number;
  placeName: string;
  latitude: number;
  longitude: number;
  isVoted: boolean;
  isAnonymous: boolean;
}

export interface VoteData {
  groupId: number;
  groupName: string;
  groupDate: null | string;
  voteId: number;
  isVotingParticipant: boolean;
  isClosed: boolean;
  isAnonymous: boolean;
  isEnabledMultipleChoice: boolean;
  endAt: null | string;
  voteStatuses: VoteStatusData[];
}

export type GetVoteRes = ResponseDto<VoteData>;

export interface voteSelectData {
  participationId: number;
  userId: number;
  nickName: string;
  isAdmin: boolean;
}

export interface voteSelectPlaceData {
  groupId: number;
  bestPlaceIds: any;
}

import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import Master from '@assets/participate/icon_master.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import IconGrayPeople from '@assets/vote/icon_gray_people.svg';
import IconOrangePeople from '@assets/vote/icon_orange_people.svg';
import { useEffect, useState } from 'react';
import VoteProgressBar from './detail/VoteProgressBar';
import VoteMemberPopup from './detail/VoteMemberPopup';

export interface VoteOptionProps {
  bestPlaceId: number;
  votes: number;
  placeName: string;
  latitude: number;
  longitude: number;
  isVoted: boolean;
  isAnonymous: boolean;
  isClosed: boolean;
  voteMax: any;
  votePlaceIds: number[];
}

const VoteChoiceOption = ({
  bestPlaceId,
  votes,
  placeName,
  isVoted,
  isClosed,
  votePlaceIds,
  isAnonymous,
  voteMax,
}: VoteOptionProps) => {
  const [checkedBox, setCheckedBox] = useState<boolean>(isVoted);
  const [isClickedPeopleIcon, setIsClickedPeopleIcon] = useState<boolean>(false);

  useEffect(() => {
    checkedBox ? votePlaceIds.push(bestPlaceId) : votePlaceIds.splice(votePlaceIds.indexOf(bestPlaceId), 1);
  }, [checkedBox]);

  return (
    <div
      className="w-full h-[72px] flex items-center pl-4 rounded-2xl"
      style={{
        backgroundColor: isClosed && voteMax?.bestPlaceId === bestPlaceId ? '#FFEADB' : '',
      }}>
      {checkedBox ? (
        <div style={{ pointerEvents: isClosed ? 'none' : 'auto' }} onClick={() => setCheckedBox(!checkedBox)}>
          <CheckBox />
        </div>
      ) : (
        <div style={{ pointerEvents: isClosed ? 'none' : 'auto' }} onClick={() => setCheckedBox(!checkedBox)}>
          <NoCheckBox />
        </div>
      )}
      <div>
        <div className="w-[988px] mx-5 text-b2 pb-1 text-left">
          {checkedBox ? (
            <div className="text-main_orange font-bold flex items-center">
              {isClosed && voteMax?.bestPlaceId === bestPlaceId && <Master />}
              <div className="ml-2">{placeName}</div>
            </div>
          ) : (
            <div className="text-font_black">{placeName}</div>
          )}
        </div>
        <div className=" mx-5 ">
          <VoteProgressBar bestPlaceId={bestPlaceId} votes={votes} />
        </div>
      </div>
      <div className="flex items-center" onClick={() => setIsClickedPeopleIcon(!isClickedPeopleIcon)}>
        {isClosed && voteMax?.bestPlaceId === bestPlaceId ? <IconOrangePeople /> : <IconGrayPeople />}
        <div
          className="ml-2 text-font_gray text-b2"
          style={{ color: isClosed && voteMax?.bestPlaceId === bestPlaceId ? '#FB7E23' : '' }}>
          {votes}
        </div>
      </div>
      {!isAnonymous && isClickedPeopleIcon && (
        <VoteMemberPopup
          placeName={placeName}
          bestPlaceId={bestPlaceId}
          setIsClickedPeopleIcon={setIsClickedPeopleIcon}
        />
      )}
    </div>
  );
};

export default VoteChoiceOption;

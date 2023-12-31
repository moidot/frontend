import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import IconPeople from '@assets/vote/icon_people.svg';
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
  votePlaceIds: number[];
}

const VoteChoiceOption = ({ bestPlaceId, votes, placeName, isVoted, votePlaceIds, isAnonymous }: VoteOptionProps) => {
  const [checkedBox, setCheckedBox] = useState<boolean>(isVoted);
  const [isClickedPeopleIcon, setIsClickedPeopleIcon] = useState<boolean>(false);

  useEffect(() => {
    checkedBox ? votePlaceIds.push(bestPlaceId) : votePlaceIds.splice(votePlaceIds.indexOf(bestPlaceId), 1);
  }, [checkedBox]);

  return (
    <div className="w-full h-[72px] flex items-center">
      {checkedBox ? (
        <div onClick={() => setCheckedBox(!checkedBox)}>
          <CheckBox />
        </div>
      ) : (
        <div onClick={() => setCheckedBox(!checkedBox)}>
          <NoCheckBox />
        </div>
      )}
      <div>
        <div className="w-[988px] mx-5 text-b2 pb-1 border-b-2 border-b-bg_orange text-left">
          {checkedBox ? (
            <div className="text-main_orange font-bold">{placeName}</div>
          ) : (
            <div className="text-font_black">{placeName}</div>
          )}
        </div>
        <div className=" mx-5 ">
          <VoteProgressBar bestPlaceId={bestPlaceId} votes={votes} />
        </div>
      </div>
      <div className="flex items-center" onClick={() => setIsClickedPeopleIcon(!isClickedPeopleIcon)}>
        <IconPeople />
        <div className="ml-2 text-font_gray text-b2">{votes}</div>
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

import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import IconPeople from '@assets/vote/icon_people.svg';
import { useEffect, useState } from 'react';

export interface VoteOptionProps {
  bestPlaceId: number;
  votes: number;
  placeName: string;
  latitude: number;
  longitude: number;
  isVoted: boolean;
  votePlaceIds: number[];
}

const VoteChoiceOption = ({ bestPlaceId, votes, placeName, isVoted, votePlaceIds }: VoteOptionProps) => {
  const [checkedBox, setCheckedBox] = useState<boolean>(isVoted);

  useEffect(() => {
    checkedBox ? votePlaceIds.push(bestPlaceId) : votePlaceIds.pop();
    console.log(votePlaceIds);
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
      <div className="w-[988px] mx-5 text-b2 pb-1 border-b-2 border-b-bg_orange text-left">
        {checkedBox ? (
          <div className="text-main_orange font-bold">{placeName}</div>
        ) : (
          <div className="text-font_black">{placeName}</div>
        )}
      </div>
      <IconPeople />
      <div className="ml-2 text-font_gray text-b2">{votes}</div>
    </div>
  );
};

export default VoteChoiceOption;

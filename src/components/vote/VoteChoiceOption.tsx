import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';
import IconPeople from '@assets/vote/icon_people.svg';
import { useState } from 'react';

const VoteChoiceOption = () => {
  const [checkedBox, setCheckedBox] = useState<boolean>(false);
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
          <div className="text-main_orange font-bold">혜화역</div>
        ) : (
          <div className="text-font_black">혜화역</div>
        )}
      </div>
      <IconPeople />
      <div className="ml-2 text-font_gray text-b2">0</div>
    </div>
  );
};

export default VoteChoiceOption;

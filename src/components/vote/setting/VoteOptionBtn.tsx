import NoCheckBox from '@assets/participate/check/no_check_box.svg';
import CheckBox from '@assets/participate/check/check_box.svg';

interface VoteOptionProps {
  title: string;
  option: boolean;
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoteOptionBtn = ({ title, option, setOption }: VoteOptionProps) => {
  return (
    <div className="mx-auto mb-[12px] w-[586px] h-[78px] bg-bg_orange rounded-2xl px-6">
      {option ? (
        <div className="h-full flex justify-between items-center">
          <div className="text-b2 text-main_orange font-bold">{title}</div>
          <div onClick={() => setOption(!option)}>
            <CheckBox />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-between items-center">
          <div className="text-b2 text-font_black">{title}</div>
          <div onClick={() => setOption(!option)}>
            <NoCheckBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteOptionBtn;

interface NextButtonProps {
  isActive: boolean;
  onClick?: () => void;
}

const NextButton = ({ isActive, onClick }: NextButtonProps) => {
  return (
    <div onClick={onClick} className="w-full bg-red-50">
      {isActive ? (
        <div className="flex items-center justify-center w-full h-[72px] bg-main_orange rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px] ">
          <div className="text-center cursor-pointer text-white text-b2">다음</div>
        </div>
      ) : (
        <div className="flex items-center justify-center  w-full h-[72px] rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px] bg-btn_disabled">
          <div className="text-center cursor-pointe text-b2 text-font_gray">다음</div>
        </div>
      )}
    </div>
  );
};
export default NextButton;

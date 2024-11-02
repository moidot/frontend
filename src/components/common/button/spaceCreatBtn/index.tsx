interface SpaceCreateButtonProps {
  isActive: boolean;
  onClick?: () => void;
}

const SpaceCreateButton = ({ isActive, onClick }: SpaceCreateButtonProps) => {
  return (
    <div onClick={onClick} className="tablets:w-[590px] w-[320px]">
      {isActive ? (
        <div className="flex items-center justify-center  h-[72px] bg-main_orange rounded-2xl pt-[20px] pb-[20px] pl-[70px] pr-[70px]">
          <div className="text-center cursor-pointer text-white tablets:text-b2 text-b4">모이닷 스페이스 만들기</div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[72px] rounded-2xl pt-[20px] pb-[20px] pl-[70px] pr-[70px] bg-btn_disabled">
          <div className="text-center cursor-pointe tablets:text-b2 text-b4 text-font_gray">모이닷 스페이스 만들기</div>
        </div>
      )}
    </div>
  );
};
export default SpaceCreateButton;

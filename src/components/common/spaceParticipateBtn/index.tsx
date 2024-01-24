interface SpaceCreateButtonProps {
  isActive: boolean;
  onClick?: () => void;
}

const SpaceParticipateButton = ({ isActive, onClick }: SpaceCreateButtonProps) => {
  return (
    <div onClick={onClick}>
      {isActive ? (
        <div className="font-Pretendard flex items-center justify-center  w-[585px] h-[72px] bg-main_orange rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px]">
          <div className="text-center cursor-pointer text-white text-b2">모이닷 스페이스 들어가기</div>
        </div>
      ) : (
        <div className="font-Pretendard flex items-center justify-center w-[585px] h-[72px] rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px] bg-btn_disabled">
          <div className="text-center cursor-pointe text-b2 text-font_gray">모이닷 스페이스 들어가기</div>
        </div>
      )}
    </div>
  );
};
export default SpaceParticipateButton;

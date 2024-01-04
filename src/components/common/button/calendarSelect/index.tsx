interface CalendarSelectProps {
  onClick: () => void;
  activeState: boolean;
}
const CalendarSelectButton = ({ onClick, activeState }: CalendarSelectProps) => {
  return (
    <div>
      {!activeState ? (
        <div
          className="flex items-center justify-center  w-[585px] h-[79px]rounded-2xl bg-btn_disabled"
          onClick={onClick}>
          <div className="text-center cursor-pointer text-font_gray text-b1">선택완료</div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center  w-[585px] h-[79px] bg-main_orange rounded-2xl"
          onClick={onClick}>
          <div className="text-center cursor-pointer text-white text-b1">선택완료</div>
        </div>
      )}
    </div>
  );
};
export default CalendarSelectButton;

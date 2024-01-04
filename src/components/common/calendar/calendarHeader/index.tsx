import PrevBtn from '@assets/calendar/prev_btn.svg';
import NextBtn from '@assets/calendar/next_btn.svg';

interface CalendarHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}
const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex justify-center items-center flex-row gap-[24px]">
      <div onClick={prevMonth}>
        <PrevBtn />
      </div>
      <div className="font-normal font-Pretendard text-font_black text-b2">
        {currentMonth.getFullYear()} . {currentMonth.getMonth() + 1}
      </div>
      <div onClick={nextMonth}>
        <NextBtn />
      </div>
    </div>
  );
};
export default CalendarHeader;

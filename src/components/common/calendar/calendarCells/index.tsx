import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { differenceInCalendarDays, addDays, format } from 'date-fns';
import { useMemo } from 'react';

interface CalendarCellProps {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarCells = ({ currentMonth, selectedDate, setSelectedDate }: CalendarCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const onDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  const createMonth = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate, selectedDate]);

  return (
    <div className="grid grid-cols-7 gap-[24px]">
      {createMonth.map((v, i) => (
        <div key={`date${i}`} className="flex justify-center items-center gap-[36px]">
          {isSameDay(v, selectedDate) ? (
            <div className="w-[44px] h-[44px] bg-main_orange rounded-xl flex justify-center items-center">
              <div className="font-normal font-Pretendard text-b3 text-white text-center" onClick={() => onDayClick(v)}>
                {format(v, 'd')}
              </div>
            </div>
          ) : (
            <div
              className="font-normal font-Pretendard text-b3 text-default_disabled text-center"
              onClick={() => onDayClick(v)}>
              {format(v, 'd')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarCells;

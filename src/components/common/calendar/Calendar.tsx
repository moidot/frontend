import CalendarHeader from './calendarHeader';
import CalendarDays from './calendarDays';
import { useState } from 'react';
import CalendarCells from './calendarCells';

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()));
  };
  return (
    <div className="flex w-[380px] flex-col justify-center items-center gap-[21px]">
      <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <CalendarDays />
      <CalendarCells currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};
export default Calendar;

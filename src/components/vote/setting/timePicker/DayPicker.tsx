import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DayPicker = ({ month, setMonth, day, setDay }: any) => {
  const monRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  const handleMonths = (i: number) => {
    setMonth(i);
    monRef.current?.children[i - 1].scrollIntoView({ behavior: 'smooth' });
  };
  const handleDays = (i: number) => {
    setDay(i);
    dayRef.current?.children[i - 1].scrollIntoView({ behavior: 'smooth' });
  };

  function getMonths() {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(
        <button
          type="button"
          key={i}
          onClick={() => handleMonths(i)}
          style={{ color: i === month ? '#FB7E23' : '#B0B0B0', fontWeight: i === month ? 'bold' : 'normal' }}
          className="w-[80px] h-[96px] text-h3 flex items-center justify-center">
          {i < 10 ? '0' + i : i}
        </button>,
      );
    }
    return months;
  }

  function getDays() {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <button
          type="button"
          key={i}
          onClick={() => handleDays(i)}
          style={{ color: i === day ? '#FB7E23' : '#B0B0B0', fontWeight: i === day ? 'bold' : 'normal' }}
          className="w-[80px] h-[96px] text-h3 flex items-center justify-center">
          {i < 10 ? '0' + i : i}
        </button>,
      );
    }
    return days;
  }
  return (
    <div className="flex h-[192px] mt-[96px] justify-around font-Pretendard">
      <div className="overflow-scroll scrollbar-hide" ref={monRef}>
        {getMonths()}
        <div className="w-[80px] h-[96px]"></div>
      </div>
      <div className="h-[96px] flex items-center text-b1 text-font_black font-bold mr-3">월</div>
      <div className="overflow-scroll scrollbar-hide" ref={dayRef}>
        {getDays()}
        <div className="w-[80px] h-[96px]"></div>
      </div>
      <div className="h-[96px] flex items-center text-b1 text-font_black font-bold">일</div>
    </div>
  );
};

export default DayPicker;

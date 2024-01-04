import { useRef } from 'react';

const TimePicker = ({ time, setTime, hour, setHour, min, setMin }: any) => {
  const timeRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);

  const times = ['오전', '오후'];

  const handleTimes = (i: number) => {
    setTime(i);
    console.log(timeRef.current?.children[i]);
    timeRef.current?.children[i].scrollIntoView({ behavior: 'smooth' });
  };
  const handleHours = (i: number) => {
    setHour(i);
    hourRef.current?.children[i - 1].scrollIntoView({ behavior: 'smooth' });
  };
  const handleMins = (i: number) => {
    setMin(i === 0 ? i : i * 5);
    console.log('minnn', min);
    minRef.current?.children[i].scrollIntoView({ behavior: 'smooth' });
  };

  function getTimes() {
    let t = [];
    for (let i = 0; i <= 1; i++) {
      t.push(
        <button
          type="button"
          key={i}
          onClick={() => handleTimes(i)}
          style={{ color: i === time ? '#FB7E23' : '#B0B0B0', fontWeight: i === time ? 'bold' : 'normal' }}
          className="w-[80px] h-[92px] text-font_gray text-b1 mb-1 flex items-center justify-center font-bold">
          {times[i]}
        </button>,
      );
    }
    return t;
  }

  function getHours() {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(
        <button
          type="button"
          key={i}
          onClick={() => handleHours(i)}
          style={{ color: i === hour ? '#FB7E23' : '#B0B0B0', fontWeight: i === hour ? 'bold' : 'normal' }}
          className="w-[80px] h-[96px] text-h3 flex items-center justify-center">
          {i < 10 ? '0' + i : i}
        </button>,
      );
    }
    return hours;
  }

  function getMins() {
    let mins = [];
    for (let i = 0; i < 12; i++) {
      mins.push(
        <button
          type="button"
          key={i}
          onClick={() => handleMins(i)}
          style={{ color: i * 5 === min ? '#FB7E23' : '#B0B0B0', fontWeight: i * 5 === min ? 'bold' : 'normal' }}
          className="w-[80px] h-[96px] text-h3 flex items-center justify-center">
          {i < 2 ? '0' + i * 5 : i * 5}
        </button>,
      );
    }
    return mins;
  }

  return (
    <div className="flex w-[330px] h-[288px] justify-around font-Pretendard">
      <div className="overflow-scroll scrollbar-hide" ref={timeRef}>
        <div className="w-[80px] h-[96px] mb-1"></div>
        {getTimes()}
        <div className="w-[80px] h-[96px]"></div>
      </div>
      <div className="overflow-scroll scrollbar-hide" ref={hourRef}>
        <div className="w-[80px] h-[96px] mb-1"></div>
        {getHours()}
        <div className="w-[80px] h-[96px]"></div>
      </div>
      <div className="h-full flex items-center text-h3 text-font_black font-bold ">:</div>
      <div className="overflow-scroll scrollbar-hide" ref={minRef}>
        <div className="w-[80px] h-[96px] mb-1"></div>
        {getMins()}
        <div className="w-[80px] h-[96px]"></div>
      </div>
    </div>
  );
};

export default TimePicker;

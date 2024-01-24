const CalendarDays = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-[42px]">
        {daysOfWeek.map((item) => (
          <div className="font-normal font-Pretendard text-b3 text-default_disabled" key={daysOfWeek.indexOf(item)}>
            {item}
          </div>
        ))}
      </div>
      <div className="w-[100%] h-[8px] bg-light_orange"></div>
    </div>
  );
};
export default CalendarDays;

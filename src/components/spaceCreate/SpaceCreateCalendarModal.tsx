import React, { useEffect, useState } from 'react';
import Calendar from '../common/calendar/Calendar';
import CloseBtn from '@assets/calendar/close_btn.svg';
import CalendarSelectButton from '../common/button/calendarSelect';

interface SpaceCreateCalendarModal {
  modalClick: boolean;
  setModalClick: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const SpaceCreateCalendarModal = ({ modalClick, setModalClick, setDate }: SpaceCreateCalendarModal) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeState, setActiveState] = useState(false);
  console.log('seletedDate', selectedDate);
  const onCloseClick = () => {
    setModalClick(!modalClick);
  };
  useEffect(() => {
    if (selectedDate !== undefined) {
      setActiveState(true);
    }
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const newDateString = `${year}.${month}.${day}`;
    setDate(newDateString);
  }, [selectedDate]);

  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10 "
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="w-[790px] pt-[32px] pb-[81px] flex justify-center items-center flex-col bg-white z-20 gap-[40px] rounded-2xl">
        <div className="flex flex-row items-center pl-[205px] pr-[44px]">
          <div className="font-normal font-Pretendard text-font_black text-h3">모임날짜를 선택해주세요</div>
          <div onClick={onCloseClick} className="pl-[133px]">
            <CloseBtn />
          </div>
        </div>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <CalendarSelectButton onClick={onCloseClick} activeState={activeState} />
      </div>
    </div>
  );
};
export default SpaceCreateCalendarModal;

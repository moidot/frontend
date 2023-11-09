import CommonPopupBackground from '@/components/common/popup/CommonPopupBackground';
import DayPicker from './timePicker/DayPicker';
import TimePicker from './timePicker/TimePicker';
import PickerOverlay from './timePicker/PickerOverlay';
import { useState } from 'react';

const VoteTimePicker = ({ setOpenPicker }: any) => {
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [time, setTime] = useState(0);
  const [hour, setHour] = useState<number>(1);
  const [min, setMin] = useState<number>(0);

  return (
    <div>
      <CommonPopupBackground>
        <div className="fixed left-[50%] translate-x-[-50%] bottom-0 w-[790px] h-[617px] bg-white rounded-t-2xl">
          <div className="mt-12 mb-14 text-center text-font_black font-bold text-h3">투표 종료시간을 선택해주세요</div>
          {/* 시간 선택 */}
          <div className="flex relative w-[702px] mx-auto justify-around">
            <DayPicker month={month} setMonth={setMonth} day={day} setDay={setDay} />
            <TimePicker time={time} setTime={setTime} hour={hour} setHour={setHour} min={min} setMin={setMin} />
            <div className="absolute top-0 -z-10 pointer-events-none">
              <PickerOverlay />
            </div>
          </div>

          <div
            onClick={() => {
              setOpenPicker(false),
                console.log('선택 시간: ', month, '월', day, '일', time === 0 ? 'AM' : 'PM', hour, ' : ', min);
            }}
            className="w-[585px] h-[72px] rounded-2xl text-b2 bg-main_orange text-white flex items-center justify-center mx-auto mt-16">
            선택완료
          </div>
        </div>
      </CommonPopupBackground>
    </div>
  );
};

export default VoteTimePicker;

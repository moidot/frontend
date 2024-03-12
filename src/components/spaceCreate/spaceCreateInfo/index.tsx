import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import { useEffect } from 'react';
import Step from '../Step';
import BackButtonBar from '@/components/common/backButtonBar';
import { useRouter } from 'next/router';
import SpaceCreateName from '../spaceCreateName';
import CalendarImg from '@assets/create/web_icon_calendar.svg';
import { useState } from 'react';
import NextButton from '@/components/common/button/next/NextButton';
import SpaceCreateCalendarModal from '../SpaceCreateCalendarModal';

const DEFAULT_DATE: string = '모임날짜를 선택해주세요.';

const SpaceCreateInfo = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [error, setError] = useState<string>('');
  const [active, setActive] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [modalClick, setModalClick] = useState(false);
  const { setCurrent, setData } = useFunnelContext();

  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [modalClick]);

  const onBackClick = () => {
    router.push('/user');
  };
  const onNextClick = () => {
    setCurrent(<SpaceCreateName />);
    setData({ name: name, date: date });
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log()
    setName(event.currentTarget.value);

    if (name.length === 15) {
      setError('모임명 최대입력은 15자까지에요');
    } else if (name.length !== 15) {
      setError('');
    }
    if (name.length > 15) setName('');
    if (name != '' && date != DEFAULT_DATE) {
      setActive(true);
    }
  };
  const onDateClick = () => {
    setDate(date);
    setModalClick(!modalClick);
  };
  useEffect(() => {
    if (name != '' && date != DEFAULT_DATE) {
      setActive(true);
    }
  }, [name, date]);

  return (
    <div className="flex justify-center items-center flex-col">
      <BackButtonBar onClick={onBackClick} />
      <div className="h-[43px]"></div>
      <Step activeStep="INFO" />
      <div className="pt-[34px] flex justify-center items-center flex-col">
        <div className="font-normal font-Pretendard text-b1 text-bg_light_gray">어떤 모임인가요?</div>
        <div className="font-bold font-Pretendard text-h3 text-black">모임 정보를 입력해 주세요.</div>
      </div>
      <div className="pt-[83px] w-[590px] gap-[32px]">
        <div className="flex flex-row items-center justify-between mb-[12px]">
          <div className="font-normal font-Pretendard text-b1 text-black">모임명</div>
          <div className="flex flex-row">
            <div className="font-normal font-Pretendard text-b3 text-font_gray">공백포함 </div>
            <div className="font-normal font-Pretendard text-b3 text-font_gray">
              {name.length >= 15 ? 15 : name.length}
            </div>
            <div className="font-normal font-Pretendard text-b3 text-font_gray">/15 자 </div>
          </div>
        </div>
        <input
          className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange"
          placeholder="15자 이내의 모임명을 입력해주세요."
          value={name}
          onChange={onNameChange}
        />
        <div className="font-normal font-Pretendard text-b3 text-alert_delete pt-[16px]">{error}</div>
      </div>
      <div className="pt-[83px] w-[590px] gap-[32px]">
        <div className="flex flex-row items-center mb-[12px]">
          <div className="font-normal font-Pretendard text-b1 text-black">모임날짜</div>
        </div>
        <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
          <div className="font-normal font-Pretendard text-b3 text-font_gray">{date}</div>
          {modalClick && portalElement ? (
            <SpaceCreateCalendarModal
              setModalClick={setModalClick}
              modalClick={modalClick}
              setDate={setDate}
              date={date}
            />
          ) : (
            <div onClick={onDateClick}>
              <CalendarImg />
            </div>
          )}
        </div>
      </div>
      <div className="pt-[185px]">
        {active ? <NextButton isActive={active} onClick={onNextClick} /> : <NextButton isActive={active} />}
      </div>
    </div>
  );
};
export default SpaceCreateInfo;

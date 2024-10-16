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
import tw from 'twin.macro';

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
    setName(event.currentTarget.value);

    if (event.currentTarget.value.length === 15) {
      setError('모임명 최대입력은 15자까지에요');
    } else if (event.currentTarget.value.length !== 15) {
      setError('');
    }
    if (event.currentTarget.value.length > 15) setName('');
    if (event.currentTarget.value != '' && date != DEFAULT_DATE) {
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
    <div className="flex flex-col items-center justify-center">
      <BackButtonBar onClick={onBackClick} />
      <div className="spacer h-6 tablets:h-10"></div>
      <Step activeStep="INFO" />
      <div className="info-header pt-[34px] flex flex-col items-center justify-center">
        <div className="text-b4 text-bg_light_gray font-normal font-Pretendard">어떤 모임인가요?</div>
        <div className="text-b1 text-black font-bold font-Pretendard">모임 정보를 입력해 주세요.</div>
      </div>
      <div className="input-section pt-[83px] gap-[32px]">
        <div className="flex flex-row items-center justify-between mb-[12px]">
          <div className={`text-b3 text-black font-normal font-Pretendard ${tw`tablets:(text-b2)`}`}>모임명</div>
          <div className="flex flex-row">
            <div className="text-b4 text-font_gray font-normal font-Pretendard">공백포함 </div>
            <div className="text-b4 text-font_gray font-normal font-Pretendard tablets:(pl-[10px]">
              {name.length >= 15 ? 15 : name.length}
            </div>
            <div className="text-b4 text-font_gray font-normal font-Pretendard">/15 자 </div>
          </div>
        </div>
        <input
          className="input-field w-[320px] h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange"
          placeholder="15자 이내의 모임명을 입력해주세요."
          value={name}
          onChange={onNameChange}
        />
        <div className="error-message text-b4 text-alert_delete pt-[16px]">{error}</div>
      </div>
      <div className="date-section pt-[83px] gap-[32px]">
        <div className="flex flex-row items-center mb-[12px]">
          <div className="text-b3 text-black font-normal font-Pretendard">모임날짜</div>
        </div>
        <div className="date-display w-[320px] h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
          <div className="text-b4 text-font_gray font-normal font-Pretendard">{date}</div>
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
      <div className="button-section pt-[185px] w-[320px]">
        <NextButton isActive={active} onClick={active ? onNextClick : undefined} />
      </div>
    </div>
  );
};
export default SpaceCreateInfo;

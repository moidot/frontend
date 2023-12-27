import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import { useEffect } from 'react';
import Step from '../Step';
import BackButtonBar from '@/components/common/backButtonBar';
import { useRouter } from 'next/router';
import SpaceCreateName from '../spaceCreateName';
import CalendarImg from '@assets/create/web_icon_calendar.svg';
import { useState } from 'react';
import NextButton from '@/components/common/button/next/NextButton';

const DEFAULT_DATE = '모임날짜를 선택해주세요.';

const SpaceCreateInfo = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState(DEFAULT_DATE);
  const [active, setActive] = useState(false);
  console.log(active);

  const { data, setCurrent, setData } = useFunnelContext();
  const onBackClick = () => {
    router.push('/user');
  };
  const onNextClick = () => {
    setCurrent(<SpaceCreateName />);
    setData({ name: '' });
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    if (name.length == 15) {
      setName('모임명 최대입력은 15자까지에요');
    } else if (name.length >= 16) {
      setName('');
    }
    if (name != '' && date != DEFAULT_DATE) {
      setActive(true);
    }
  };
  const onDateChange = () => {
    setDate(date);
    if (name != '' && date != DEFAULT_DATE) {
      setActive(true);
    }
  };
  useEffect(() => {
    console.log(data);
  }, []);

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
      </div>
      <div className="pt-[83px] w-[590px] gap-[32px]">
        <div className="flex flex-row items-center mb-[12px]">
          <div className="font-normal font-Pretendard text-b1 text-black">모임날짜</div>
        </div>
        <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange flex flex-row items-center justify-between">
          <div className="font-normal font-Pretendard text-b3 text-font_gray">{date}</div>
          <div onChange={onDateChange}>
            <CalendarImg />
          </div>
        </div>
      </div>
      <div className="pt-[185px]">
        {active ? <NextButton isActive={active} onClick={onNextClick} /> : <NextButton isActive={active} />}
      </div>
    </div>
  );
};
export default SpaceCreateInfo;

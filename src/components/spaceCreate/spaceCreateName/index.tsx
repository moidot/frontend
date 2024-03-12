import BackButtonBar from '@/components/common/backButtonBar';
import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import Step from '../Step';
import SpaceCreateInfo from '../spaceCreateInfo';
import { useState } from 'react';
import NextButton from '@/components/common/button/next/NextButton';
import SpaceCreateMoveInfo from '../spaceCreateMoveInfo';
const SpaceCreateName = () => {
  const { data, setCurrent, setData } = useFunnelContext();
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string>('');

  const onBackClick = () => {
    setCurrent(<SpaceCreateInfo />);
  };
  const onNextClick = () => {
    setCurrent(<SpaceCreateMoveInfo />);
    setData({ name: data?.name, date: data?.date, nickname: name });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    const regex = /^[a-zA-Z0-9ㄱ-ㅣ가-힣]*$/;

    // regex처리
    if (regex.test(event.currentTarget.value) === false) {
      setError('부적절한 닉네임입니다 (특수문자)');
    } else if (event.currentTarget.value.length === 8) {
      setError('닉네임 최대입력은 8자까지에요');
    } else {
      setError('');
    }

    // 글자길이
    if (event.currentTarget.value.length > 8) {
      setName('');
    }
    if (
      event.currentTarget.value.length <= 8 &&
      event.currentTarget.value.length > 0 &&
      regex.test(event.currentTarget.value) == true
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <BackButtonBar onClick={onBackClick} />
      <div className="h-[43px]"></div>
      <Step activeStep="NAME" />
      <div className="pt-[34px] flex justify-center items-center flex-col">
        <div className="flex flex-row">
          <div className="font-normal font-Pretendard text-b1 text-main_orange">{data?.name}</div>
          <div className="font-normal font-Pretendard text-b1 text-bg_light_gray">에서 사용할</div>
        </div>
        <div className="font-bold font-Pretendard text-h3 text-black">닉네임을 알려주세요</div>
      </div>
      <div className="pt-[83px] w-[590px] gap-[32px]">
        <div className="flex flex-row items-center justify-between mb-[12px]">
          <div className="font-normal font-Pretendard text-b1 text-black">닉네임</div>
          <div className="font-normal font-Pretendard text-b3 text-font_gray">공백포함 {name.length} / 8자</div>
        </div>
        <input
          className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange"
          placeholder="8자 이내의 이름을 입력해주세요."
          value={name}
          onChange={onNameChange}
        />
        <div className="font-normal font-Pretendard text-b3 text-alert_delete pt-[16px]">{error}</div>
      </div>

      <div className="pt-[185px]">
        {active ? <NextButton isActive={active} onClick={onNextClick} /> : <NextButton isActive={active} />}
      </div>
    </div>
  );
};
export default SpaceCreateName;

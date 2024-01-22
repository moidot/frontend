import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import { useState } from 'react';
import NextButton from '@/components/common/button/next/NextButton';
import SpaceCreateMoveInfo from '../spaceCreateMoveInfo';
import InviteStep from '../InviteStep';

const SpaceCreateName = () => {
  const teamName = sessionStorage.getItem('groupName');
  const { data, setCurrent, setData } = useFunnelContext();
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string>('');

  const onNextClick = () => {
    setCurrent(<SpaceCreateMoveInfo />);
    setData({ name: data?.name, date: data?.date, nickname: name });
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    const regex = /^[a-zA-Z0-9가-힣]*$/;

    // regex처리
    if (regex.test(name) == false) {
      setError('부적절한 닉네임입니다 (특수문자)');
    } else {
      setError('');
    }
    // 글자길이
    if (name.length >= 8) {
      setName('');
    }
    if (name.length <= 8 && name.length >= 1 && regex.test(name) == true) {
      setActive(true);
    }
    if (name.length == 1) {
      setActive(false);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-[100vw] h-[80px] border border-divider "></div>
      <div className="h-[43px]"></div>
      <InviteStep activeStep="NAME" />
      <div className="pt-[34px] flex justify-center items-center flex-col">
        <div className="flex flex-row">
          <div className="font-normal font-Pretendard text-b1 text-main_orange">{teamName}</div>
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

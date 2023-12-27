import BackButtonBar from '@/components/common/backButtonBar';
import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import Step from '../Step';
import SpaceCreateInfo from '../spaceCreateInfo/SpaceCreateInfo';
const SpaceCreateName = () => {
  const { data, setCurrent, setData } = useFunnelContext();
  const onBackClick = () => {
    setCurrent(<SpaceCreateInfo />);
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <BackButtonBar onClick={onBackClick} />
      <div className="h-[43px]"></div>
      <Step activeStep="NAME" />
      <div className="pt-[34px] flex justify-center items-center flex-col">
        <div className="flex flex-row">
          <div className="font-normal font-Pretendard text-b1 text-main_orange">모이닷 팀 프로젝트</div>
          <div className="font-normal font-Pretendard text-b1 text-bg_light_gray">에서 사용할</div>
        </div>
        <div className="font-bold font-Pretendard text-h3 text-black">닉네임을 알려주세요</div>
      </div>
      <div className="pt-[83px] w-[590px] gap-[32px]">
        <div className="flex flex-row items-center justify-between mb-[12px]">
          <div className="font-normal font-Pretendard text-b1 text-black">닉네임</div>
          <div className="font-normal font-Pretendard text-b3 text-font_gray">공백포함 0 / 8자</div>
        </div>
        <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange">
          <div className="font-normal font-Pretendard text-b3 text-font_gray">15자 이내의 모임명을 입력해주세요.</div>
        </div>
      </div>
    </div>
  );
};
export default SpaceCreateName;

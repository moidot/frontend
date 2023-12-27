import { useFunnelContext } from '@/components/funnel/FunnelContentProvider';
import { useEffect } from 'react';
import Step from '../Step';
import BackButtonBar from '@/components/common/backButtonBar';
import { useRouter } from 'next/router';
const SpaceCreateInfo = () => {
  const router = useRouter();
  const { data, setCurrent, setData } = useFunnelContext();
  const onBackClick = () => {
    router.push('/user');
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
          <div className="font-normal font-Pretendard text-b3 text-font_gray">공백포함 0 / 15자</div>
        </div>
        <div className="w-full h-[72px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] rounded-lg bg-bg_orange">
          <div className="font-normal font-Pretendard text-b3 text-font_gray">15자 이내의 모임명을 입력해주세요.</div>
        </div>
      </div>
    </div>
  );
};
export default SpaceCreateInfo;

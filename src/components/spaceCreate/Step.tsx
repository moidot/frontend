type Step = 'INFO' | 'NAME' | 'START_LOCATION';
interface ActiveStepProps {
  activeStep: Step;
}
const Step = ({ activeStep }: ActiveStepProps) => {
  return (
    <div>
      {activeStep == 'INFO' && (
        <div className="flex items-center flex-row justify-center gap-[40px]">
          <div className="w-[48px] h-[48px] rounded-2xl bg-main_orange flex items-center justify-center">
            <div className=" font-Pretendard text-white text-b1 font-bold text-center">1</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard text-accent_orange text-b2 font-normal text-center">2</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard  text-accent_orange text-b2 font-normal text-center">3</div>
          </div>
        </div>
      )}
      {activeStep == 'NAME' && (
        <div className="flex justify-center items-center flex-row gap-[40px]">
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard  text-accent_orange text-b2 font-normal">1</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-main_orange flex items-center justify-center">
            <div className=" font-Pretendard text-white text-b1 font-bold">2</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard  text-accent_orange text-b2 font-normal">3</div>
          </div>
        </div>
      )}
      {activeStep == 'START_LOCATION' && (
        <div className="flex justify-center items-center flex-row gap-[40px]">
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard  text-accent_orange text-b2 font-normal">1</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-bg_orange flex items-center justify-center">
            <div className=" font-Pretendard  text-accent_orange text-b2 font-normal">2</div>
          </div>
          <div className="w-[48px] h-[48px] rounded-2xl bg-main_orange flex items-center justify-center">
            <div className=" font-Pretendard text-white text-b1 font-bold">3</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;

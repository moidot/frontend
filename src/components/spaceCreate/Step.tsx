type Step = 'INFO' | 'NAME' | 'START_LOCATION';

interface ActiveStepProps {
  activeStep: Step;
}

const StepCircle = ({ number, isActive }: { number: number; isActive: boolean }) => (
  <div
    className={`w-8 h-8 rounded-[12px] tablets:w-12 tablets:h-12  tablets:rounded-2xl flex items-center justify-center ${
      isActive ? 'bg-main_orange' : 'bg-bg_orange'
    }`}>
    <div
      className={`font-Pretendard text-b2 text-center ${
        isActive ? 'text-white font-bold text-b1' : 'text-accent_orange font-normal'
      }`}>
      {number}
    </div>
  </div>
);

const Step = ({ activeStep }: ActiveStepProps) => {
  const steps = ['INFO', 'NAME', 'START_LOCATION'];
  return (
    <div className="flex justify-center items-center flex-row gap-6 tablets:gap-10">
      {steps.map((step, index) => (
        <StepCircle key={step} number={index + 1} isActive={activeStep === step} />
      ))}
    </div>
  );
};

export default Step;

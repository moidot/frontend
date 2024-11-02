import BackBtn from '@assets/header/web_btn_back.svg';

interface BackButtonProps {
  onClick: () => void;
}
const BackButtonBar = ({ onClick }: BackButtonProps) => {
  return (
    <>
      <div className="w-[100vw] flex justify-center flex-col h-14 tablets:h-20 ">
        <div onClick={onClick} className="pl-[5vw] tablets:pl-[10vw] hover:cursor-pointer">
          <BackBtn className="w-4 h-4 tablets:w-8 tablets:h-8" />
        </div>
      </div>
      <div className="w-[100vw] h-[1px] bg-divider"></div>
    </>
  );
};

export default BackButtonBar;

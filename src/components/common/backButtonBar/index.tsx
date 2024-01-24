import BackBtn from '@assets/header/web_btn_back.svg';

interface BackButtonProps {
  onClick: () => void;
}
const BackButtonBar = ({ onClick }: BackButtonProps) => {
  return (
    <div className="w-[100vw] flex flex-col pt-[24px] cursor-pointer">
      <div onClick={onClick} className="pl-[360px] pb-[24px]">
        <BackBtn />
      </div>
      <div className="w-[100vw] h-[1px] bg-divider "></div>
    </div>
  );
};

export default BackButtonBar;

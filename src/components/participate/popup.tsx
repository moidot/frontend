interface popupProps {
  role: string;
  title: string;
  desc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFunction: any;
}

const Popup = ({ role, title, desc, setFunction }: popupProps) => {
  const clickDelete = () => {
    alert('삭제되었습니다.');
    setFunction(false);
  };

  const clickCancel = () => {
    setFunction(false);
  };

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="font-Pretendard">
        <div className="w-[790px] h-[367px] border mt-[25vh] mx-auto p-8 text-center rounded-2xl bg-white">
          <div className="pb-8 text-h3 text-font_black font-bold">{title}</div>
          <div className="text-b2 text-font_gray whitespace-pre">{desc}</div>
          <div className="flex w-[600px] mt-[85px] justify-between mx-auto">
            <button
              type="button"
              className="w-[277px] h-[78px] rounded-2xl border-2 border-main_orange text-main_orange text-b2 flex items-center justify-center"
              onClick={clickDelete}>
              {role === 'member' ? <span>모이닷 스페이스 나가기</span> : <span>삭제하기</span>}
            </button>
            <button
              type="button"
              className="w-[277px] h-[78px] rounded-2xl bg-main_orange text-white text-b2 font-bold flex items-center justify-center"
              onClick={clickCancel}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

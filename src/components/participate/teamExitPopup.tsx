const TeamExitPopup = () => {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="font-Pretendard relative">
        <div className="w-[790px] h-[241px] border mt-[35vh] mx-auto p-8 text-center rounded-2xl bg-white text-h3 font-bold">
          <span>나가기가 완료되었습니다.</span>
          <div className="flex w-[585px] mt-[45px] mx-auto">
            <button
              type="button"
              className="w-full h-[78px] rounded-2xl bg-main_orange text-white text-b1 font-bold flex items-center justify-center">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamExitPopup;

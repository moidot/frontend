import { useMutation } from '@tanstack/react-query';
import CommonPopupBackground from '../common/popup/CommonPopupBackground';
import { deleteAuth } from '@/apis/deleteAuth';
import api from '@/services/TokenService';

const DeletePopup = ({ onAuthClick }: any) => {
  const desc = '모이닷을 탈퇴하시게 되면 내가 속해있는\n 모이닷 스페이스에서 전부 나가게 됩니다.';
  const token = api.getToken();
  // 투표 종료하기 Mutation
  const deleteAuthMutation = useMutation(() => deleteAuth(token), {
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      location.reload();
    },
    onError: () => {
      console.log('회원 탈퇴 error');
    },
  });
  return (
    <CommonPopupBackground>
      <div className="flex justify-center h-[100vh] items-center font-Pretendard">
        <div className="w-[790px] h-[320px] rounded-2xl bg-white ">
          <div className="text-h3 mt-[40px] text-center text-font_black font-bold whitespace-pre">
            정말 탈퇴하시겠습니까?
          </div>
          <div className="text-b2 text-font_gray text-center mt-[20px] mb-[50px] whitespace-pre-line">{desc}</div>
          <div className="flex w-[585px] justify-between items-center mx-auto mb-[16px]">
            <div
              onClick={onAuthClick}
              className="flex justify-center items-center w-[277px] h-[78px] rounded-2xl border-2 border-main_orange mx-auto text-main_orange text-b2 cursor-pointer">
              취소하기
            </div>
            <div
              onClick={() => deleteAuthMutation.mutate()}
              className="flex justify-center items-center w-[277px] h-[78px] rounded-2xl bg-main_orange mx-auto text-white text-b2 cursor-pointer">
              탈퇴하기
            </div>
          </div>
        </div>
      </div>
    </CommonPopupBackground>
  );
};

export default DeletePopup;

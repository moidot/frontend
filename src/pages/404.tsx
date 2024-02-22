import BackButtonBar from '@/components/common/backButtonBar';
import ErrorImg from '@assets/error/icon_error.svg';

export default function NotFound() {
  const onClickBack = () => {
    location.replace('/user');
  };

  const onClickLogin = () => {
    location.replace('/');
  };
  return (
    <div className="font-Pretendard text-center">
      <BackButtonBar onClick={onClickBack} />
      <div className="text-h3 font-bold pt-20">앗, 오류가 발생했어요</div>
      <div className="text-b2 pt-2 pb-24 text-main_orange">에러가 발생했거나 잘못된 경로로 접근된 것 같아요!</div>
      <ErrorImg className="mx-auto" />
      <div
        className="flex items-center justify-center mx-auto w-[585px] h-[72px] bg-main_orange rounded-2xl pt-[20px] pb-[20px] pl-[92px] pr-[92px] my-16 cursor-pointer"
        onClick={onClickLogin}>
        <div className="text-center cursor-pointer text-white text-b2">다시 로그인하기</div>
      </div>
    </div>
  );
}

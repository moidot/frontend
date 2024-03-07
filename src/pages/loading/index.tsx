import BackButtonBar from '@/components/common/backButtonBar';
import LoadingImg from '@assets/loading/icon_loading.svg';
import LoadGif from '@assets/loading/gif_loading.svg';

export default function LoadingPage() {
  const onClickBack = () => {
    location.replace('/user');
  };

  return (
    <div className="font-Pretendard text-center">
      <BackButtonBar onClick={onClickBack} />
      <div className="text-h3 font-bold pt-20">잠시만 기다려주세요!</div>
      <div className="text-b2 pt-2 pb-24 text-main_orange">우리가 만나는 지점, 어디일까요?</div>
      <LoadingImg className="mx-auto" />
      <div className="mx-auto my-16 w-[48px] h-[48px] object-cover">
        <LoadGif />
      </div>
    </div>
  );
}

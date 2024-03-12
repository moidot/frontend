import KakaoTalk from '@assets/participate/icon_kakao_talk.svg';
import Copy from '@assets/participate/icon_copy.svg';
import { handleCopyClipBoard } from '@/utils/copyUrl';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { groupIdAtom } from '@/states/groupIdAtom';

interface UrlProps {
  pathname: string;
  teamname: string;
}

const UrlButton = ({ pathname, teamname }: UrlProps) => {
  const baseURL = 'https://www.moidot.co.kr'; // 배포 url로 변경하기
  const id: any = useRecoilValue(groupIdAtom);
  useEffect(() => {
    console.log(pathname.split('/').slice(-1)[0]);
    console.log('yayayay', pathname);
  }, [pathname]);

  const onShare = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${teamname}에서 함께 해요!`,
        description: `${teamname}에서 모임원으로\n초대했어요. 참여해보세요!`,
        imageUrl:
          'https://moidot-bucket.s3.ap-northeast-2.amazonaws.com/image/kakao-message/feed_%E1%84%8E%E1%85%A9%E1%84%83%E1%85%A2_png.png',
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },

      buttons: [
        {
          title: '모이닷으로 가기',
          link: {
            mobileWebUrl: `https://www.moidot.co.kr/invite/${pathname.split('/').slice(-1)[0]}`,
            webUrl: `https://www.moidot.co.kr/invite/${pathname.split('/').slice(-1)[0]}`,
          },
        },
      ],
    });
  };

  return (
    <div className="flex w-[90vw] desktop:w-[440px] justify-between items-center text-b3 text-font_black mx-auto">
      <div
        className="flex items-center cursor-pointer text-b2"
        onClick={() => handleCopyClipBoard(`${baseURL}/invite/${id.groupId}`)}>
        URL 복사하기
        <Copy className="ml-2" />
      </div>
      <div className="w-[1px] h-[26px] bg-bg_light_gray"></div>
      <div className="flex items-center cursor-pointer text-b2" onClick={onShare}>
        카카오톡 공유하기
        <KakaoTalk className="ml-2" />
      </div>
    </div>
  );
};

export default UrlButton;

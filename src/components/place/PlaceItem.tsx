import PhoneIcon from '@assets/main/phone.svg';
import TimeIcon from '@assets/main/time.svg';
import Image from 'next/image';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import { ChipList } from '.';

interface PlaceItemProps {
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
  detail?: BestRegionPlaceDetailProps;
  category: keyof typeof ChipList;
}

const PlaceItem = ({ title, thumUrl, distance, openTime, tel, category }: PlaceItemProps) => {
  const renderCategoryImage = () => {
    switch (category) {
      case 'CAFE':
        return 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/cafe_png.png';
      case 'LIBRARY':
        return 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/library_png.png';
      case 'RESTAURANT':
        return 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/sicdang_png.png';
      case 'STUDY_CAFE':
        return 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/studycafe_png.png';
      case 'STUDY_ROOM':
        return 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/studyroom_png.png';
    }
  };
  //<div style={{ overflow: 'hidden' }}>{renderCategoryImage()}</div>

  return (
    <>
      <div className="bg-white w-[30rem] xl:w-[38rem] h-[228px] rounded-2xl flex-row flex gap-5 shadow-card_shadow  over">
        {thumUrl ? (
          <div style={{ overflow: 'hidden' }} className="rounded-l-2xl flex justify-start relative">
            <Image src={thumUrl} width={175} height={185} alt="placeImg" priority style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ overflow: 'hidden' }} className="rounded-l-2xl flex justify-start relative">
            <Image
              src={renderCategoryImage()}
              width={175}
              height={185}
              alt="placeImg"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div className=" flex flex-col gap-[64px]">
          <div>
            <div className="font-Pretendard text-black text-b3 xl:text-b1 font-bold pt-4">{title}</div>
            <div className="font-Pretendard text-main_orange text-b4 font-regular">{distance}</div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row gap-[12px] items-center">
              <div className="flex flex-row gap-[4px]">
                <TimeIcon />
                <div className="font-Pretendard text-font_gray text-b3 font-regular">영업 종료 시간</div>
              </div>
              <div className="font-Pretendard text-font_gray text-b2 font-bold">{openTime}</div>
            </div>
            <div className="flex flex-row gap-[12px] items-center pb-[16px]">
              <div className="flex flex-row gap-[4px]">
                <PhoneIcon />
                <div className="font-Pretendard text-font_gray text-b3 font-regular">연락처</div>
              </div>
              <div className="font-Pretendard text-font_gray text-b2 font-bold">{tel}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlaceItem;

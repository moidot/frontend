import PhoneIcon from '@assets/main/phone.svg';
import TimeIcon from '@assets/main/time.svg';
import Image from 'next/image';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import CafeImg from '@assets/place/cafe_vec.svg';
import LibraryImg from '@assets/place/library_vec.svg';
import RestaurantImg from '@assets/place/sicdang_vec.svg';
import StudyRoomImg from '@assets/place/studyroom_vec.svg';
import StudyCafeImg from '@assets/place/studycafe_vec.svg';
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
        return <CafeImg />;
      case 'LIBRARY':
        return <LibraryImg />;
      case 'RESTAURANT':
        return <RestaurantImg />;
      case 'STUDY_CAFE':
        return <StudyCafeImg />;
      case 'STUDY_ROOM':
        return <StudyRoomImg />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white w-[585px]  rounded-2xl flex-row flex p-8 gap-5 shadow-card_shadow ">
        <div style={{ borderRadius: '16px' }}>
          {thumUrl ? (
            <Image src={thumUrl} layout="fixed" width={175} height={160} alt="placeImg" priority />
          ) : (
            renderCategoryImage()
          )}
        </div>
        <div className=" flex flex-col gap-[64px]">
          <div>
            <div className="font-Pretendard text-black text-b1 font-bold">{title}</div>
            <div className="font-Pretendard text-main_orange text-b4 font-regular">{distance}</div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row gap-[12px]">
              <div className="flex flex-row gap-[4px]">
                <TimeIcon />
                <div className="font-Pretendard text-font_gray text-b3 font-regular">영업 종료 시간</div>
              </div>
              <div className="font-Pretendard text-font_gray text-b2 font-bold">{openTime}</div>
            </div>
            <div className="flex flex-row gap-[12px]">
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

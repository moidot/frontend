import Image from 'next/image';

import AddressIcon from '@assets/main/address.svg';
import PhoneIcon from '@assets/main/phone.svg';
import HomePageIcon from '@assets/main/homePage.svg';
import FeatureIcon from '@assets/main/feature.svg';
import TimeIcon from '@assets/main/time.svg';
import CloseBtn from '@assets/main/closeBtn.svg';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import CafeImg from '@assets/placeDetail/cafe_vec.svg';
import LibraryImg from '@assets/placeDetail/library_vec.svg';
import RestaurantImg from '@assets/placeDetail/sicdang_vec.svg';
import StudyRoomImg from '@assets/placeDetail/studyroom_vec.svg';
import StudyCafeImg from '@assets/placeDetail/studycafe_vec.svg';
import { ChipList } from '../place';

interface PlaceDetailInfoProps {
  setModalClick: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
  detail: BestRegionPlaceDetailProps;
  category: keyof typeof ChipList;
}

const PlaceDetailInfo = ({
  setModalClick,
  title,
  thumUrl,
  distance,
  openTime,
  tel,
  detail,
  category,
}: PlaceDetailInfoProps) => {
  const onClick = () => {
    setModalClick(false);
  };
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
    <div className="flex gap-10 flex-row">
      <div style={{ borderRadius: '16px' }}>
        {thumUrl ? <Image src={thumUrl} width={404} height={373} alt="placeImg" /> : renderCategoryImage()}
      </div>
      <div className=" flex flex-col gap-[40px]">
        <div className=" flex flex-col gap-[4px]">
          <div className="flex">
            <div className=" rounded-[30px] bg-main_orange pb-2 pt-2 pr-4 pl-4 ">
              <div className=" font-Pretendard text-white text-b1 font-bold">{detail.local}</div>
            </div>
          </div>
          <div className="font-Pretendard text-black text-h3 font-bold">{title}</div>
          <div className="font-Pretendard text-main_orange text-b3 font-regular">{distance}</div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <AddressIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">상세 위치</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regu">{detail.address}</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <TimeIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">운영시간</div>
            </div>
            <div className="font-Pretendard text-main_orange text-b3 font-bold">{detail.status}</div>
            <div className="font-Pretendard text-black text-b3 font-regular">{openTime}</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <HomePageIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">홈페이지</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">{detail.hompageUrl}</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <PhoneIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">연락처</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">{tel}</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <FeatureIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">특징</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">{detail.category}</div>
          </div>
        </div>
      </div>
      <div className="top-0" onClick={onClick}>
        <CloseBtn />
      </div>
    </div>
  );
};
export default PlaceDetailInfo;

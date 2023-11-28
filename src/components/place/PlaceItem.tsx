import PhoneIcon from '@assets/main/phone.svg';
import TimeIcon from '@assets/main/time.svg';
import Image from 'next/image';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
interface PlaceItemProps {
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
  detail?: BestRegionPlaceDetailProps;
}

const PlaceItem = ({ title, thumUrl, distance, openTime, tel }: PlaceItemProps) => {
  return (
    <>
      <div className="bg-white w-[585px]  rounded-2xl flex-row flex p-8 gap-5 shadow-card_shadow ">
        <div style={{ borderRadius: '16px' }}>
          <Image
            src={
              thumUrl
                ? thumUrl
                : 'https://ldb-phinf.pstatic.net/20221124_209/1669253717040P6mjS_JPEG/KakaoTalk_20221123_114530445_03.jpg'
            }
            width={175}
            height={180}
            priority
            alt="placeImg"
          />
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

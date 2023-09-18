import Image from 'next/image';
import CafeImg from '@assets/main/cafeImg.png';
import AddressIcon from '@assets/main/address.svg';
import PhoneIcon from '@assets/main/phone.svg';
import HomePageIcon from '@assets/main/homePage.svg';
import FeatureIcon from '@assets/main/feature.svg';
import TimeIcon from '@assets/main/time.svg';
import CloseBtn from '@assets/main/closeBtn.svg';

interface PlaceDetailInfoProps {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaceDetailInfo = ({ click, setClick }: PlaceDetailInfoProps) => {
  const onClick = () => {
    setClick(false);
  };
  return (
    <div className="flex gap-10 flex-row">
      <div style={{ borderRadius: '16px' }}>
        <Image src={CafeImg} width={300} height={300} alt="placeImg" />
      </div>
      <div className=" flex flex-col gap-[40px]">
        <div className=" flex flex-col gap-[4px]">
          <div className="inline-block rounded-[30px] flex justify-center items-center bg-main_orange pr-1.5 pl-1.5 pt-1 pb-1">
            <div className="font-Pretendard text-white text-b1 font-bold">성신여대입구역</div>
          </div>
          <div className="font-Pretendard text-black text-h3 font-bold">커피나무 성신여대점</div>
          <div className="font-Pretendard text-main_orange text-b3 font-regular">성신여대입구역(으)로부터 480m</div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <AddressIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">상세 위치</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regu">서울 성북구 보문로 어쩌구</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <TimeIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">운영시간</div>
            </div>
            <div className="font-Pretendard text-main_orange text-b3 font-bold">영업중</div>
            <div className="font-Pretendard text-black text-b3 font-regular">매일 9:30 ~ 21:30</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <HomePageIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">홈페이지</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">https://어쩌구</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <PhoneIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">연락처</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">02-922-1672</div>
          </div>
          <div className="flex flex-row gap-[12px]">
            <div className="flex flex-row gap-[4px]">
              <FeatureIcon />
              <div className="font-Pretendard text-font_gray text-b3 font-regular">특징</div>
            </div>
            <div className="font-Pretendard text-black text-b3 font-regular">스터디카페 카페</div>
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

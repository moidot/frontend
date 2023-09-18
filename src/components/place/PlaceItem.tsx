import PhoneIcon from '@assets/main/phone.svg';
import TimeIcon from '@assets/main/time.svg';
import Image from 'next/image';
import CafeImg from '@assets/main/cafeImg.png';

const PlaceItem = () => {
  return (
    <>
      <div className="bg-white w-[100%]  rounded-2xl flex-row flex p-8 gap-5">
        <div style={{ borderRadius: '16px' }}>
          <Image src={CafeImg} width={175} height={227} alt="placeImg" />
        </div>
        <div className=" flex flex-col gap-[64px]">
          <div>
            <div className="font-Pretendard text-black text-b1 font-bold">커피나무 성신여대점</div>
            <div className="font-Pretendard text-main_orange text-b4 font-regular">성신여대입구역(으)로부터 480m</div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row gap-[12px]">
              <div className="flex flex-row gap-[4px]">
                <TimeIcon />
                <div className="font-Pretendard text-font_gray text-b3 font-regular">영업 종료 시간</div>
              </div>
              <div className="font-Pretendard text-font_gray text-b2 font-bold">22:00</div>
            </div>
            <div className="flex flex-row gap-[12px]">
              <div className="flex flex-row gap-[4px]">
                <PhoneIcon />
                <div className="font-Pretendard text-font_gray text-b3 font-regular">연락처</div>
              </div>
              <div className="font-Pretendard text-font_gray text-b2 font-bold">02-922-1672</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlaceItem;

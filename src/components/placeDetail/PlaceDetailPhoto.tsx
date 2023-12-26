import Image from 'next/image';

interface PlaceDetailPhotoProps {
  thumUrls: string[];
}

const PlaceDetailPhoto = ({ thumUrls }: PlaceDetailPhotoProps) => {
  console.log(thumUrls);
  return (
    <div className="flex flex-row pt-[12px] gap-[13px]">
      <div style={{ position: 'relative', width: '570px', height: '323px' }}>
        <Image src={thumUrls[0]} width={570} height={323} alt="placeImg" />
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="flex flex-row gap-[13px]">
          <Image src={thumUrls[1]} width={258} height={155} alt="placeImg" />
          <Image src={thumUrls[1]} width={258} height={155} alt="placeImg" />
        </div>
        <div className="flex flex-row gap-[13px] ">
          <Image src={thumUrls[1]} width={258} height={155} alt="placeImg" />
          <Image src={thumUrls[1]} width={258} height={155} alt="placeImg" />
        </div>
      </div>
    </div>
  );
};
export default PlaceDetailPhoto;

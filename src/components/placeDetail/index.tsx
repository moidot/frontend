import PlaceDetailInfo from './PlaceDetailInfo';
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';
import { ChipList } from '../place';
interface PlaceDetailProps {
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
  setModalClick: React.Dispatch<React.SetStateAction<boolean>>;
  detail: BestRegionPlaceDetailProps;
  category: keyof typeof ChipList;
}

export type placeDetailType = 'LOCATION' | 'PHOTO';
const PlaceDetail = ({
  title,
  thumUrl,
  distance,
  openTime,
  tel,
  setModalClick,
  detail,
  category,
}: PlaceDetailProps) => {
  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10"
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="flex flex-col justify-center items-center rounded-xl w-[1200px] p-20 bg-white z-20">
        <PlaceDetailInfo
          title={title}
          thumUrl={thumUrl}
          distance={distance}
          openTime={openTime}
          tel={tel}
          setModalClick={setModalClick}
          detail={detail}
          category={category}
        />
      </div>
    </div>
  );
};

export default PlaceDetail;

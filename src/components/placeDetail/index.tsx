import PlaceDetailInfo from './placeDetailInfo';

interface PlaceDetailProps {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export type placeDetailType = 'LOCATION' | 'PHOTO';
const PlaceDetail = ({ click, setClick }: PlaceDetailProps) => {
  return (
    <div
      className="fixed flex justify-center items-center flex-row top-0 right-0 left-0 w-[100vw] h-[100vh] z-10"
      style={{ backgroundColor: 'rgba( 0, 0, 0, 0.6 )' }}>
      <div className="flex flex-col justify-center items-center rounded-xl w-[60%] p-20 bg-white z-20">
        <PlaceDetailInfo click={click} setClick={setClick} />
      </div>
    </div>
  );
};

export default PlaceDetail;

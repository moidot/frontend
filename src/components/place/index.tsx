import { createPortal } from 'react-dom';
import More from '../common/button/more';
import PlaceItem from './PlaceItem';
import { useState, useEffect } from 'react';
import PlaceDetail from '../placeDetail';
import ChipCafeOff from '@assets/chip/chip_cafe_off.svg';
import ChipCafeOn from '@assets/chip/chip_cafe_on.svg';
import ChipLibraryOff from '@assets/chip/chip_library_off.svg';
import ChipLibraryOn from '@assets/chip/chip_library_on.svg';
import ChipRestaurantOff from '@assets/chip/chip_restaurant_off.svg';
import ChipRestaurantOn from '@assets/chip/chip_restaurant_on.svg';
import ChipRoomOn from '@assets/chip/chip_room_off.svg';
import ChipRoomOff from '@assets/chip/chip_room_off.svg';
import ChipStudyOff from '@assets/chip/chip_study_off.svg';
import ChipStudyOn from '@assets/chip/chip_study_on.svg';

const Place = () => {
  const [click, setClick] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [cafe, setCafe] = useState(false);
  const [studyCafe, setStudyCafe] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [library, setLibrary] = useState(false);
  const [studyRoom, setStudyRoom] = useState(false);

  const onCafeClick = () => {
    setCafe(!cafe);
    setStudyCafe(false);
    setRestaurant(false);
    setLibrary(false);
    setStudyRoom(false);
  };

  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [click]);
  const onClick = () => {
    setClick(!click);
  };
  return (
    <div>
      {click && portalElement ? (
        createPortal(<PlaceDetail click={click} setClick={setClick} />, portalElement)
      ) : (
        <div className="flex flex-col ">
          <div className="font-Pretendard text-black text-h3 font-bold pt-[44px]">모여서 여기로 가는거 어때요?</div>
          <div className="flex flex-row gap-12 pt-[12px]">
            {cafe ? (
              <div onClick={onCafeClick}>
                <ChipCafeOn />
              </div>
            ) : (
              <div onClick={onCafeClick}>
                <ChipCafeOff />
              </div>
            )}
            {library ? <ChipLibraryOn /> : <ChipLibraryOff />}
            {studyCafe ? <ChipStudyOn /> : <ChipStudyOff />}
            {studyRoom ? <ChipRoomOn /> : <ChipRoomOff />}
            {restaurant ? <ChipRestaurantOn /> : <ChipRestaurantOff />}
          </div>
          <div className="grid grid-cols-2 w-[100%] p-5 gap-8">
            <div onClick={onClick}>
              <PlaceItem />
            </div>
            <div onClick={onClick}>
              <PlaceItem />
            </div>
          </div>
          <div className="flex justify-center items-center p-5">
            <More />
          </div>
        </div>
      )}
    </div>
  );
};
export default Place;

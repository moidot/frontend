import { createPortal } from 'react-dom';
import More from '../common/button/more';
import PlaceItem from './PlaceItem';
import { useState, useEffect } from 'react';
import PlaceDetail from '../placeDetail';

const Place = () => {
  const [click, setClick] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

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
        <div className="flex flex-col">
          <div className="font-Pretendard text-black text-h3 font-bold">모여서 여기로 가는거 어때요?</div>
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

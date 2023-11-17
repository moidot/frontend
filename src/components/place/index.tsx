import More from '../common/button/more';
import PlaceItem from './PlaceItem';
import { useState, useEffect } from 'react';
import ChipCafeOff from '@assets/chip/chip_cafe_off.svg';
import ChipCafeOn from '@assets/chip/chip_cafe_on.svg';
import ChipLibraryOff from '@assets/chip/chip_library_off.svg';
import ChipLibraryOn from '@assets/chip/chip_library_on.svg';
import ChipRestaurantOff from '@assets/chip/chip_restaurant_off.svg';
import ChipRestaurantOn from '@assets/chip/chip_restaurant_on.svg';
import ChipRoomOn from '@assets/chip/chip_room_on.svg';
import ChipRoomOff from '@assets/chip/chip_room_off.svg';
import ChipStudyOff from '@assets/chip/chip_study_off.svg';
import ChipStudyOn from '@assets/chip/chip_study_on.svg';
import { useGetGroupBestRegionPlace } from '@/hooks/useGetGroupBestRegionPlace';
import api from '@/services/TokenService';
import { KeywordType } from '@/apis/getGroupBestRegionPlace';
import PlaceDetail from '../placeDetail';

const ChipList = {
  CAFE: 'CAFE',
  STUDY_CAFE: 'STUDY_CAFE',
  RESTAURANT: 'RESTAURANT',
  LIBRARY: 'LIBRARY',
  STUDY_ROOM: 'STUDY_ROOM',
} as const;

interface PlaceProps {
  lng: string;
  lat: string;
  local: string;
}

interface PlaceDetailProps {
  title: string;
  thumUrl: string;
  distance: string;
  openTime: string;
  tel: string;
}

const Place = ({ lng, lat, local }: PlaceProps) => {
  const token = api.getToken();
  const [modalClick, setModalClick] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [keyword, setKeyword] = useState<KeywordType>('카페');
  const [chip, setChip] = useState<keyof typeof ChipList>(ChipList.LIBRARY);
  const [data, setData] = useState<PlaceDetailProps>();
  console.log(data);
  useEffect(() => {
    if (chip == 'CAFE') {
      setKeyword('카페');
    } else if (chip == 'STUDY_CAFE') {
      setKeyword('스터디카페');
    } else if (chip == 'RESTAURANT') {
      setKeyword('식당');
    } else if (chip == 'LIBRARY') {
      setKeyword('도서관');
    } else {
      setKeyword('스터디룸');
    }
  }, [chip]);
  const { data: bestPlaceData } = useGetGroupBestRegionPlace(token, lat, lng, local, keyword);
  console.log(bestPlaceData);

  const onChipClick = (chip: keyof typeof ChipList) => {
    console.log(chip);
    setChip(chip);
  };
  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [modalClick]);

  const onModalClick = ({ title, openTime, thumUrl, distance, tel }: PlaceDetailProps) => {
    const data: PlaceDetailProps = { title: title, openTime: openTime, thumUrl: thumUrl, distance: distance, tel: tel };
    setData(data);
    setModalClick(!modalClick);
  };
  return (
    <div>
      <div className="flex flex-col ">
        <div className="font-Pretendard text-black text-h3 font-bold pt-[44px]">모여서 여기로 가는거 어때요?</div>
        <div className="flex flex-row gap-12 pt-[12px]">
          {chip == ChipList.CAFE ? (
            <div>
              <ChipCafeOn />
            </div>
          ) : (
            <div onClick={() => onChipClick(ChipList.CAFE)}>
              <ChipCafeOff />
            </div>
          )}
          {chip == ChipList.LIBRARY ? (
            <div>
              <ChipLibraryOn />
            </div>
          ) : (
            <div onClick={() => onChipClick(ChipList.LIBRARY)}>
              <ChipLibraryOff />
            </div>
          )}
          {chip == ChipList.STUDY_CAFE ? (
            <div>
              <ChipStudyOn />
            </div>
          ) : (
            <div onClick={() => onChipClick(ChipList.STUDY_CAFE)}>
              <ChipStudyOff />
            </div>
          )}
          {chip == ChipList.STUDY_ROOM ? (
            <div>
              <ChipRoomOn />
            </div>
          ) : (
            <div onClick={() => onChipClick(ChipList.STUDY_ROOM)}>
              <ChipRoomOff />
            </div>
          )}
          {chip == ChipList.RESTAURANT ? (
            <div>
              <ChipRestaurantOn />
            </div>
          ) : (
            <div onClick={() => onChipClick(ChipList.RESTAURANT)}>
              <ChipRestaurantOff />
            </div>
          )}
        </div>
        {modalClick && portalElement ? (
          <div>
            <PlaceDetail
              title={data?.title as string}
              tel={data?.tel as string}
              thumUrl={data?.thumUrl as string}
              distance={data?.distance as string}
              openTime={data?.openTime as string}
              setModalClick={setModalClick}
            />
          </div>
        ) : (
          <div className=" flex flex-col justify-center items-center ">
            <div className="pt-[44px]"></div>
            <div className="flex w-1/2 justify-center items-center gap-[30px]">
              {bestPlaceData ? (
                bestPlaceData.data.slice(0, 2).map((item) => (
                  <div key={item.x} className="flex-1" onClick={() => onModalClick(item)}>
                    <PlaceItem
                      title={item.title}
                      openTime={item.openTime}
                      thumUrl={item.thumUrl}
                      distance={item.distance}
                      tel={item.tel}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
            <div className="pt-[30px]"></div>
            <div className="flex w-1/2 justify-center items-center gap-[30px]">
              {bestPlaceData ? (
                bestPlaceData.data.slice(2, 4).map((item) => (
                  <div key={item.x} className="flex-1" onClick={() => onModalClick(item)}>
                    <PlaceItem
                      title={item.title}
                      openTime={item.openTime}
                      thumUrl={item.thumUrl}
                      distance={item.distance}
                      tel={item.tel}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center pt-[140px]">
          <More />
        </div>
      </div>
    </div>
  );
};
export default Place;

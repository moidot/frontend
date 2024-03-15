// import More from '../common/button/more';
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
import { BestRegionPlaceDetailProps } from '@/types/SpaceType';

export const ChipList = {
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
  detail: BestRegionPlaceDetailProps;
  thumUrls: string[];
}

const Place = ({ lng, lat, local }: PlaceProps) => {
  const [modalClick, setModalClick] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [keyword, setKeyword] = useState<KeywordType>('카페');
  const [chip, setChip] = useState<keyof typeof ChipList>(ChipList.CAFE);
  const [data, setData] = useState<PlaceDetailProps>();
  const [category, setCategory] = useState<keyof typeof ChipList>(ChipList.CAFE);
  // console.log(data);
  useEffect(() => {
    if (chip == 'CAFE') {
      setKeyword('카페');
      setCategory('CAFE');
    } else if (chip == 'STUDY_CAFE') {
      setKeyword('스터디카페');
      setCategory('STUDY_CAFE');
    } else if (chip == 'RESTAURANT') {
      setKeyword('식당');
      setCategory('RESTAURANT');
    } else if (chip == 'LIBRARY') {
      setKeyword('도서관');
      setCategory('LIBRARY');
    } else {
      setKeyword('스터디룸');
      setCategory('STUDY_ROOM');
    }
  }, [chip]);
  const { data: bestPlaceData } = useGetGroupBestRegionPlace(lat, lng, local, keyword);
  console.log(local, '의 카테고리:', category, '키워드: ', keyword, '추천데이터:', bestPlaceData);

  const onChipClick = (chip: keyof typeof ChipList) => {
    console.log('chip', chip);
    setChip(chip);
  };
  useEffect(() => {
    setPortalElement(document.getElementById('root-modal'));
  }, [modalClick]);

  const onModalClick = ({ title, openTime, thumUrl, distance, tel, detail, thumUrls }: PlaceDetailProps) => {
    const data: PlaceDetailProps = {
      title: title,
      openTime: openTime,
      thumUrl: thumUrl,
      distance: distance,
      tel: tel,
      detail: detail,
      thumUrls: thumUrls,
    };
    setData(data);
    setModalClick(!modalClick);
  };
  return (
    <div>
      <div className="flex flex-col ">
        <div className="font-Pretendard text-black text-h3 font-bold pt-[44px] w-[1200px] mx-auto">
          모여서 여기로 가는거 어때요?
        </div>
        <div className="flex flex-row gap-12 pt-[12px] w-[1200px] mx-auto">
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
              detail={data?.detail as BestRegionPlaceDetailProps}
              category={category}
              lng={lng}
              lat={lat}
              thumUrls={data?.detail.thumUrls as string[]}
              menu={data?.detail.menuInfo as string[]}
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
                      category={category}
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
                      category={category}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center pt-[140px]">{/* <More /> */}</div>
      </div>
    </div>
  );
};
export default Place;

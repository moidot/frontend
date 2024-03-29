import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import RecommendationItem from './RecommendationItem';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { recommendIndexAtom } from '@/states/recommendIndexAtom';

const Recommendation = (props: GetGroupBestRegionListRes) => {
  const data = props.data;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const setRecommendIndex = useSetRecoilState(recommendIndexAtom);

  return (
    <div className="mx-auto -mt-[84px] z-10 overflow-hidden w-[100vw]">
      <div className="flex justify-start overflow-hidden">
        {data.map((item) => (
          <div
            key={data.indexOf(item)}
            id={data.indexOf(item).toString()}
            className="mr-5"
            onClick={() => {
              setSlideIndex(data.indexOf(item));
              setRecommendIndex(data.indexOf(item));
            }}
            style={{
              marginLeft: data.indexOf(item) === 0 ? '18vw' : '',
              transform: `translateX(${-100 * slideIndex}%)`,
              transition: 'all 0.5s ease-in-out',
            }}>
            <RecommendationItem
              userId={item.userId}
              name={item.name}
              latitude={item.latitude}
              longitude={item.longitude}
              moveUserInfo={item.moveUserInfo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Recommendation;

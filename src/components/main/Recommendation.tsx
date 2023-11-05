import { GetGroupBestRegionListRes } from '@/types/SpaceType';
import RecommendationItem from './RecommendationItem';

const Recommendation = (props: GetGroupBestRegionListRes) => {
  const data = props.data;
  console.log(data.length);
  return (
    <div>
      <div className="carousel w-full">
        {data.map((item) => (
          <div
            key={data.indexOf(item)}
            id={data.indexOf(item).toString()}
            className="carousel-item relative w-full  flex justify-center items-center">
            <RecommendationItem
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

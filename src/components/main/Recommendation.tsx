import RecommendationItem from './RecommendationItem';

export interface RecommendationProps {
  stationName: string;
}
const Recommendation = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full flex justify-center items-center">
          <div className="flex justify-center items-center">
            <RecommendationItem />
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full flex justify-center items-center">
          <div className="flex justify-center items-center">
            <RecommendationItem />
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full flex justify-center items-center">
          <div className="flex justify-center items-center">
            <RecommendationItem />
          </div>
        </div>
      </div>
    </>
  );
};
export default Recommendation;

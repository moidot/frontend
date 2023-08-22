import SwipeText from '@assets/home/swipe/text_guide_swipe.svg';
import Image from 'next/image';
interface ISwipeList {
  index: number;
  image: string;
}
export const swipeList: ISwipeList[] = [
  {
    index: 0,
    image: '/assets/home/swipe/card1.svg',
  },
  {
    index: 1,
    image: '/assets/home/swipe/card2.svg',
  },
  {
    index: 2,
    image: '/assets/home/swipe/card3.svg',
  },
  {
    index: 3,
    image: '/assets/home/swipe/card4.svg',
  },
  {
    index: 4,
    image: '/assets/home/swipe/card5.svg',
  },
];
const Home3 = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
      <SwipeText />
      <div className="carousel rounded-box">
        <div className="carousel-item">
          <Image src={swipeList[0].image} width="1200" height="338" alt="card1" />
        </div>
        <div className="carousel-item">
          <Image src={swipeList[1].image} width="1200" height="338" alt="card2" />
        </div>
        <div className="carousel-item">
          <Image src={swipeList[2].image} width="1200" height="338" alt="card3" />
        </div>
        <div className="carousel-item">
          <Image src={swipeList[3].image} width="1200" height="338" alt="card4" />
        </div>
        <div className="carousel-item">
          <Image src={swipeList[4].image} width="1200" height="338" alt="card5" />
        </div>
      </div>
    </div>
  );
};

export default Home3;

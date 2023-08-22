import SwipeText from '@assets/home/swipe/text_guide_swipe.svg';
import Card1 from '@assets/home/swipe/card1.svg';
import Card2 from '@assets/home/swipe/card2.svg';
import Card3 from '@assets/home/swipe/card3.svg';
import Card4 from '@assets/home/swipe/card4.svg';
import Card5 from '@assets/home/swipe/card5.svg';

interface ISwipeList {
  index: number;
  image: React.FC<React.SVGProps<SVGSVGElement>>;
}
export const swipeList: ISwipeList[] = [
  {
    index: 0,
    image: Card1,
  },
  {
    index: 1,
    image: Card2,
  },
  {
    index: 2,
    image: Card3,
  },
  {
    index: 3,
    image: Card4,
  },
  {
    index: 4,
    image: Card5,
  },
];
const Home3 = () => {
  const [current, setCurrent] = useState(swipeList[0].index);

  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
      <SwipeText />
    </div>
  );
};

export default Home3;

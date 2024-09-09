import RenewalImg from '@assets/main/renewal-img.png';
import MobileRenewalImg from '@assets/main/renewal-mobile.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RenewalPage = () => {
  const [resize, setResize] = useState<any>();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setResize(window.innerWidth);
    });

    const time = setTimeout(() => {
      console.log(window.innerWidth);
      setResize(window.innerWidth);
    }, 0.0000000000000000001);

    return () => {
      window.removeEventListener('resize', () => {
        setResize(window.innerWidth);
      });

      clearTimeout(time);
    };
  }, []);
  return (
    <div className="">
      <Image
        src={resize <= 680 ? MobileRenewalImg : RenewalImg}
        alt={'모이닷 서비스 리뉴얼 진행중입니다.'}
        className="w-screen"
      />
    </div>
  );
};

export default RenewalPage;

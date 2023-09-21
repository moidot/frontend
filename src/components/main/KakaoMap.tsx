import { GetUserInfoProps } from '@/types/SpaceType';

import { useEffect } from 'react';

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    kakao: any;
  }
}

interface KakaoMapProps {
  lng: number;
  lat: number;
  // adminUser: GetUserInfoProps[];
  // defaultUser: GetUserInfoProps[];
}

const KakaoMap = ({ lng, lat }: KakaoMapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    // sceipt가 완전히 로드된 후 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        //지도를 표시할 div
        const container = document.getElementById('map');
        //지도 중심좌표
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        //지도 생성
        const map = new window.kakao.maps.Map(container, options);
        // 경로 표시
        // const adminPath: any[] = [];
        // const defaultPath: any[] = [];

        // Object.entries(adminUser[0].path).map(([key, value]) =>
        //   adminPath.push(new window.kakao.maps.LatLng(value.x, value.y)),
        // );

        // console.log(adminPath);

        // for (let i = 0; i < defaultUser.length; i++) {
        //   Object.entries(defaultUser[i]).map(([key, value]) =>
        //     defaultPath.push(new window.kakao.maps.LatLng(value.x, value.y)),
        //   );
        // }

        // // // 지도에 표시할 선

        // const adminPolyline = new window.kakao.maps.Polyline({
        //   path: adminPath,
        //   strokeWeight: 5,
        //   strokeColor: '#FB7E23',
        //   strokeStyle: 'solid',
        // });
        // adminPolyline.setMap(map);
        // for (let i = 0; i < defaultPath.length; i++) {
        //   const item = defaultPath[i];
        //   const polyline = new window.kakao.maps.Polyline({
        //     map: map,
        //     path: item.path,
        //     strokeWeight: 5,
        //     strokeColor: '#fff',
        //     strokeStyle: 'solid',
        //   });
        // }
      });
    };
    //script 완전히 로드된 후 지도 띄우는 코드
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <>
      <div id="map" className="w-[100%] h-[600px]"></div>
    </>
  );
};
export default KakaoMap;

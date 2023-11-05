import { GetPathProps, GetUserInfoProps } from '@/types/SpaceType';

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
  adminUser: GetUserInfoProps[];
  defaultUser: GetUserInfoProps[];
}

interface PathProps {
  id: number;
  path: any[];
}

const KakaoMap = ({ lng, lat, adminUser, defaultUser }: KakaoMapProps) => {
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
        const adminPath: PathProps[] = [];
        const defaultPath: PathProps[] = [];

        console.log(adminUser);

        for (let i = 0; i < adminUser.length; i++) {
          const list: any[] = [];
          Object.entries(adminUser[i].path).map((item) =>
            list.push(new window.kakao.maps.LatLng(item[1].x, item[1].y)),
          );

          console.log(list);
          adminPath.push({
            id: i,
            path: list,
          });
        }
        console.log(adminPath);

        const linePath: any[] = [];
        Object.entries(adminUser[0].path).map((item) =>
          linePath.push(new window.kakao.maps.LatLng(item[1].x, item[1].y)),
        );

        const polyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#AD4C0D', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
        });

        polyline.setMap(map);

        for (let i = 0; i < defaultUser.length; i++) {
          const list: any[] = [];
          Object.entries(defaultUser[i].path).map((item) =>
            list.push(new window.kakao.maps.LatLng(item[1].x, item[1].y)),
          );

          defaultPath.push({
            id: i,
            path: list,
          });
        }

        // for (let i = 0; i < defaultPath.length; i++) {
        //   const item = defaultPath[i].path;
        //   const polyline = new window.kakao.maps.Polyline({
        //     path: item,
        //     strokeWeight: 5,
        //     strokeColor: '#fff',
        //     strokeStyle: 'solid',
        //   });
        //   polyline.setMap(map);
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

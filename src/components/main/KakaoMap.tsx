import { GetUserInfoProps } from '@/types/SpaceType';

import { useEffect } from 'react';

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

    // script가 완전히 로드된 후 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        //지도를 표시할 div
        const container = document.getElementById('map');
        //지도 중심좌표
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 6,
        };
        //지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 마킹 찍기
        let imageSrc = 'https://jungminbuckets.s3.ap-northeast-2.amazonaws.com/marker.svg', // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(80, 108), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new window.kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        marker.setMap(map);

        // 경로 표시
        const adminPath: PathProps[] = [];
        const defaultPath: PathProps[] = [];

        for (let i = 0; i < adminUser.length; i++) {
          let list: any[] = [new window.kakao.maps.LatLng(adminUser[i].path[0].y, adminUser[i].path[0].x)];
          Object.entries(adminUser[i].path).map((item) =>
            list.push(new window.kakao.maps.LatLng(item[1].y, item[1].x)),
          );

          adminPath.push({
            id: i,
            path: list,
          });
        }

        for (let i = 0; i < defaultUser.length; i++) {
          let list: any[] = [new window.kakao.maps.LatLng(defaultUser[i].path[0].y, defaultUser[i].path[0].x)];
          Object.entries(defaultUser[i].path).map((item) =>
            list.push(new window.kakao.maps.LatLng(item[1].y, item[1].x)),
          );

          defaultPath.push({
            id: i,
            path: list,
          });
        }

        console.log(adminPath);
        for (let i = 0; i < defaultPath.length; i++) {
          const item = defaultPath[i].path;
          console.log(item);
          const polyline = new window.kakao.maps.Polyline({
            map: map,
            path: item,
            strokeWeight: 5,
            strokeColor: '#7E7E7E',
            strokeOpacity: 1,
            strokeStyle: 'solid',
          });
          polyline.setMap(map);
        }

        for (let i = 0; i < adminPath.length; i++) {
          const item = adminPath[i].path;
          console.log(item);
          const polyline = new window.kakao.maps.Polyline({
            map: map,
            path: item,
            strokeWeight: 5,
            strokeColor: '#FB7E23',
            strokeOpacity: 1,
            strokeStyle: 'solid',
          });
          polyline.setMap(map);
        }
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

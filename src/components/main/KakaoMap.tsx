import { GetUserInfoProps } from '@/types/SpaceType';

import { useEffect } from 'react';

interface KakaoMapProps {
  lng: number;
  lat: number;
  user: GetUserInfoProps[];
  otherUser: GetUserInfoProps[];
}

interface PathProps {
  id: number;
  path: any[];
}

const KakaoMap = ({ lng, lat, user, otherUser }: KakaoMapProps) => {
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
        let imageSrc = 'https://moidot-bucket.s3.ap-northeast-2.amazonaws.com/image/marker.svg', // 마커이미지의 주소입니다
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
        const userPath: PathProps[] = [];
        const otherUserPath: PathProps[] = [];
        const userMarkerImgSrc = 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/user_marking.svg',
          userImageSize = new window.kakao.maps.Size(33, 43);
        const othersMarkerImgSrc = 'https://jungminbucket2.s3.ap-northeast-2.amazonaws.com/others_marking.svg',
          othersImageSize = new window.kakao.maps.Size(33, 43);

        for (let i = 0; i < user.length; i++) {
          let list: any[] = [new window.kakao.maps.LatLng(user[i].path[0].y, user[i].path[0].x)];
          Object.entries(user[i].path).map((item) => list.push(new window.kakao.maps.LatLng(item[1].y, item[1].x)));

          userPath.push({
            id: i,
            path: list,
          });
        }

        for (let i = 0; i < otherUser.length; i++) {
          let list: any[] = [new window.kakao.maps.LatLng(otherUser[i].path[0].y, otherUser[i].path[0].x)];
          Object.entries(otherUser[i].path).map((item) =>
            list.push(new window.kakao.maps.LatLng(item[1].y, item[1].x)),
          );

          otherUserPath.push({
            id: i,
            path: list,
          });
        }

        for (let i = 0; i < otherUserPath.length; i++) {
          const item = otherUserPath[i].path;
          let othersMarkerImage = new window.kakao.maps.MarkerImage(othersMarkerImgSrc, othersImageSize),
            othersMarkerPosition = new window.kakao.maps.LatLng(item[0].Ma, item[0].La); // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          let othersMarker = new window.kakao.maps.Marker({
            position: othersMarkerPosition,
            image: othersMarkerImage, // 마커이미지 설정
          });

          othersMarker.setMap(map);
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

        for (let i = 0; i < userPath.length; i++) {
          const item = userPath[i].path;
          let userMarkerImage = new window.kakao.maps.MarkerImage(userMarkerImgSrc, userImageSize),
            userMarkerPosition = new window.kakao.maps.LatLng(item[0].Ma, item[0].La); // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          let userMarker = new window.kakao.maps.Marker({
            position: userMarkerPosition,
            image: userMarkerImage, // 마커이미지 설정
          });

          userMarker.setMap(map);
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

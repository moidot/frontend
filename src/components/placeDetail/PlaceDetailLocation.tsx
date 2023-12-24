import { useEffect } from 'react';

interface KakaoMapProps {
  lng: number;
  lat: number;
}

const PlaceDetailLocation = ({ lng, lat }: KakaoMapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    // script가 완전히 로드된 후 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        //지도를 표시할 div
        const container = document.getElementById('detailMap');
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
      });
    };
    //script 완전히 로드된 후 지도 띄우는 코드
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <>
      <div id="detailMap" className="w-[100%] h-[323px]"></div>
    </>
  );
};
export default PlaceDetailLocation;

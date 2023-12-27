import { useEffect } from 'react';

const VoteKakaoMapUpdate = ({ locationInfo }: any) => {
  useEffect(() => {
    if (locationInfo) {
      const lat = locationInfo[0]?.latitude;
      const lng = locationInfo[0]?.longitude;
      const mapScript = document.createElement('script');

      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;

      document.head.appendChild(mapScript);

      // script가 완전히 로드된 후 실행

      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          //지도를 표시할 div
          const container = document.getElementById('vote-map');
          //지도 중심좌표
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 6,
          };
          //지도 생성
          const map = new window.kakao.maps.Map(container, options);

          // 마커 이미지의 이미지 주소입니다
          const imageSrc = 'https://moidot-bucket.s3.ap-northeast-2.amazonaws.com/image/marker.svg';

          for (let i = 0; i < locationInfo.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            const imageSize = new window.kakao.maps.Size(40, 58);

            // 마커 이미지를 생성합니다
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new window.kakao.maps.LatLng(locationInfo[i].latitude, locationInfo[i].longitude), // 마커를 표시할 위치
              title: locationInfo[i].placeName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
          }
        });
      };
      //script 완전히 로드된 후 지도 띄우는 코드
      mapScript.addEventListener('load', onLoadKakaoMap);
    }
  }, [locationInfo]);

  return (
    <>
      <div id="vote-map" className="w-[100%] h-[600px]"></div>
    </>
  );
};
export default VoteKakaoMapUpdate;

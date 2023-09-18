import { useEffect } from 'react';

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    kakao: any;
  }
}
const KakaoMap = () => {
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
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        //지도 생성
        const map = new window.kakao.maps.Map(container, options);
        // // 경로 표시
        // const linePath: any[] = [];
        // Object.entries(routes[0]).map(([key, value]) =>
        //   linePath.push(new window.kakao.maps.LatLng(value[0], value[1])),
        // );

        // // 지도에 표시할 선

        // const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        // const polyline = new window.kakao.maps.Polyline({
        //   path: linePath, // 선을 구성하는 좌표배열 입니다
        //   strokeWeight: 5, // 선의 두께 입니다
        //   strokeColor: '#AD4C0D', // 선의 색깔입니다
        //   strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //   strokeStyle: 'solid', // 선의 스타일입니다
        // });

        // polyline.setMap(map);
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

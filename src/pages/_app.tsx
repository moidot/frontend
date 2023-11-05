import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { CookiesProvider } from 'react-cookie';

declare global {
  interface Window {
    Kakao: any;
    kakao: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  // console.log(Component.contextTypes);

  function kakaoInit() {
    // 페이지가 로드되면 실행
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <Component {...pageProps} />
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
          <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"></Script>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

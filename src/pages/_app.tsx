import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../../src/output.css';
import { CookiesProvider } from 'react-cookie';
import '../../src/index.css';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

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

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <Head>
            <title>모이닷</title>
            <meta name="keywords" content="중간위치 찾기" />
            <meta name="description" content="모두를 위한 모임 통합 관리 서비스, 모이닷" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </Head>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Component {...pageProps} />
          <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
          <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"></Script>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

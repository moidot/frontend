import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <Main />
        <div id="root-modal" />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* <link href="./output.css" rel="stylesheet" /> */}</Head>
      <body>
        <Main />
        <div id="root-modal" />
        <NextScript />
      </body>
    </Html>
  );
}

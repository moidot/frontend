import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Link href="../../src/input.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <div id="root-modal" />
        <NextScript />
      </body>
    </Html>
  );
}

import { Head, Html, Main, NextScript } from 'next/document';
import 'regenerator-runtime/runtime';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/assets/images/logo.svg" />
      </Head>
      <link rel="preconnect" href="https://fonts.googlefonts.cn" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="crossOrigin"
      />
      <link
        href="https://fonts.googlefonts.cn/css2?family=Nunito:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

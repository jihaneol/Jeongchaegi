// 여기서 전역으로 메타데이터, 언어 수정 / 나중에 각 페이지별로 하던지 말던지

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head>
        <meta name="description" content="i just want increase SEO" />
        <meta name="google-site-verification" content="t7Rx38xM5tH7op-QZNIm8XW_2eYsaU8ZDxBLuSl0Icg" />
      </Head>
      <body className={`bg-aliceblue min-h-screen`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

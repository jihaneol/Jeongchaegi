// 여기서 전역으로 메타데이터, 언어 수정 / 나중에 각 페이지별로 하던지 말던지

import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
      <meta
        name="description"
        content="i just want increase SEO"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
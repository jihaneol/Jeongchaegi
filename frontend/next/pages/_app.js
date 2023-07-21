// import '../styles/globals.css'  // 일단 글로벌 스타일 제거
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'  // 검색 엔진 최적화용, 전역 페이지 타이틀 먹임, 나중에 페이지별로 적용하거나

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My new app</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

// import '../styles/globals.css'  // 일단 글로벌 스타일 제거
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head"; // 검색 엔진 최적화용, 전역 페이지 타이틀 먹임, 나중에 페이지별로 적용하거나
import "../styles/HomeCalendar.css"; // 글로벌이라 잠만 구조파악하기 전까지만 쓸게여

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>new app</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/HomeCalendar.css";
import { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "../styles/globals.css";

// const LOGOUT_TIME_SET = 600000; // 10 * 60 * 1000 (10분)
const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false); // ssr 동안 PersistGate를 무시하도록 설정

  useEffect(() => {
    // 클라이언트에서만 이 훅이 실행됩니다.
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>정채기</title>
        <meta name="google-site-verification" content="oki5AKJZxS7fbCL6iANmqnSq3jCcBDzvI1RSrSerioc" />
        <meta name="description" content="청년 정책을 한 눈에 모아보고 관심 있는 정책은 클릭 한 번에 톡캘린더에 등록할 수 있습니다!" />
      </Head>
      <Provider store={store}>
        {isClient ? (
          <PersistGate loading={<div />} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </>
  );
}

export default MyApp;

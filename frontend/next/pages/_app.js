import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/HomeCalendar.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "../styles/globals.css";

// const LOGOUT_TIME_SET = 600000; // 10 * 60 * 1000 (10분)

function MyApp({ Component, pageProps }) {
  const isBrowser = typeof window !== "undefined"; // ssr 동안 PersistGate를 무시하도록 설정
  let persistor = persistStore(store);

  return (
    <>
      <Head>
        <title>섹시 경섭</title>
      </Head>
      <Provider store={store}>
        {isBrowser ? (
          <PersistGate loading={null} persistor={persistor}>
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

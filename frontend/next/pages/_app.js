import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/HomeCalendar.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import { persistStore } from "redux-persist";
import "../styles/globals.css";
import { useEffect } from "react";
import Logout from "../components/Logout";
import { userActions } from "../store/user";

// const LOGOUT_TIME_SET = 600000; // 10 * 60 * 1000 (10분)

const LOGOUT_TIME_SET = 10000; // 10 * 1000 (10초)

function AppContent({ Component, pageProps }) {
  // 로그아웃 관련 변수
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const logout = Logout();

  const handleActivity = () => {
    if (userData.timer) {
      clearTimeout(userData.timer);
    }
    
    const logoutTimer = setTimeout(() => {
      dispatch(userActions.setLogout());
      alert("로그아웃 되었습니다.");
      logout();
    }, LOGOUT_TIME_SET);

    dispatch(userActions.setTimer(logoutTimer));
  };

  useEffect(() => {
    if (userData.isLogined && !userData.timer) {
      handleActivity();
    }

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    
    return () => {
      if (userData.timer) {
        clearTimeout(userData.timer);
      }
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, [userData.isLogined, userData.timer, dispatch]);

  return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <>
      <Head>
        <title>섹시 경섭</title>
      </Head>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          {/* <AppContent Component={Component} pageProps={pageProps} /> */}
          <Component {...pageProps} />
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}

export default MyApp;

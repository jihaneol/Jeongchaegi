import axios from "axios";
import Logout from "../components/Logout";
import { Router, useRouter } from "next/router";

export default function OurAxios() {
  let requestCount = 0;
  const logout = Logout();

  function getTokens() {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const kakaoToken = localStorage.getItem("kakaoToken");
      return { accessToken, refreshToken, kakaoToken };
    }
  }

  let tokens = getTokens();

  // axios 설정
  const api = axios.create({
    baseURL: "http://www.jeongchaegi.com/api",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 인터셉터 설정
  api.interceptors.request.use(
    async (config) => {
      requestCount++;

      if (requestCount > 10) {
        requestCount = 0;
        return Promise.reject(
          new Error(`You have axceeded the maximum number of requests.`)
        );
      }
      tokens = getTokens();
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      requestCount = 0;
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // access Token 만료
      console.log("response error 도착!");
      if (error.response && error.response?.status === 401) {
        // refresh token 전송하기
        api
          .get("/login/refresh-token", {
            headers: {
              Authorization_refresh: `Bearer ${tokens.refreshToken}`,
            },
          })
          .then((response) => {
            // accessToken 이랑 refreshToken 잘 받았으면
            console.log(response);
            const at = response?.data.accesstoken;
            const rt = response?.data.refreshtoken;
            const kt = response?.data.kakaotoken;
            tokens = {
              accessToken: at,
              refreshToken: rt,
              kakaoToken: kt,
            };
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            localStorage.setItem("kakaoToken", tokens.kakaoToken);
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            // 원래 액션을 axios 를 통해 다시 요청함
            return api(originalRequest);
          })
          .catch((error) => {
            alert("로그인이 만료되었습니다.");
            logout();
            Router.push("/");
            return Promise.reject(error);
          });
      } else {
        return Promise.reject(error);
      }
    }
  );
  return api;
}

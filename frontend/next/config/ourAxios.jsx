import axios from "axios";

export default function OurAxios() {
  let requestCount = 0;

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

      if (requestCount > 10)
        return Promise.reject(
          new Error(`You have axceeded the maximum number of requests.`)
        );
      tokens = getTokens();
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // access_token 이랑 요청 보냄 -> access_token 만료되면 status 로 에러 보냄 -> refresh_token 다시 보내고
  // refresh_token 보내면 access_token 다시 발급, 근데 refresh_token 도 만료되면 그 때는 다시 로그인 해야 함.

  api.interceptors.response.use(
    (response) => {
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
            return Promise.reject(error);
          });
      } else {
        return Promise.reject(error);
      }
    }
  );
  return api;
}

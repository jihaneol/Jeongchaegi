import axios from "axios";

export default function OurAxios() {
  let requestCount = 0;

  function getTokens() {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      return { accessToken, refreshToken };
    }
  }

  let tokens = getTokens();
  console.log(tokens);

  // axios 설정
  const api = axios.create({
    baseURL: "http://3.36.131.236/api",
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
      console.log("in Our Axios at Request: ", config.headers.Authorization);
      return config;
    },
    (error) => {
      console.log("in our axios at request error!!");
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
        console.log("response status == 401", error.response?.status);
        console.log("refresh-token = ", tokens.refreshToken);
        // refresh token 전송하기
        api
          .get("/members/refresh-token", {
            headers: {
              Authorization_refresh: `Bearer ${tokens.refreshToken}`,
            },
          })
          .then((response) => {
            // accessToken 이랑 refreshToken 잘 받았으면
            console.log("token refresh 보내기!!", tokens.refreshToken);
            console.log("원래 token", tokens);
            console.log("response = ", response);
            const at = response.config.headers.Authorization.split(" ");
            const rt = response.config.headers.Authorization_refresh.split(" ");
            tokens = {
              accessToken: at[1],
              refreshToken: rt[1],
            };
            console.log("바뀐 token", tokens);
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            console.log("originalREquest = ", originalRequest);
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            // 원래 액션을 axios 를 통해 다시 요청함
            return api(originalRequest);
          })
          .catch((error) => {
            console.log("token refresh 못 보냄...");
            return Promise.reject(error);
          });
      } else {
        return Promise.reject(error);
      }
    }
  );

  return api;
}

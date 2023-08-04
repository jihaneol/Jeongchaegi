import axios from "axios";
import GetLoginToken from "../components/GetLoginToken";

export default function OurAxios() {
  let tokens = GetLoginToken();

  // axios 설정
  const api = axios.create({
    baseURL: "http://3.36.131.236:8081/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 인터셉터 설정
  api.interceptors.request.use(
    (config) => {
      if (tokens.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
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
      console.log("res: ", response);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log(error);
      // access Token 만료
      if (error.response.status === 401) {
        // refresh token 전송하기
        api
          .post("/refresh-token", {
            headers: {
              Authorization_refresh: tokens.refreshToken,
            },
          })
          .then((response) => {
            // accessToken 이랑 refreshToken 잘 받았으면
            console.log(response);
            tokens = response.headers;
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            // 원래 액션을 axios 를 통해 다시 요청함
            return api(originalRequest);
          })
          .catch((error) => {
            console.error(
              "Refresh Token 이 만료되었습니다. 다시 로그인해주세요."
            );
            return Promise.reject(error);
          });
      } else {
        return Promise.reject(error);
      }
    }
  );

  return api;
}

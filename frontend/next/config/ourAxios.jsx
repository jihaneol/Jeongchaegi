import axios from "axios";

// axios 설정
const api = axios.create({
    baseURL: "http://3.36.131.236:8081/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 인터셉터 설정
  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
      console.log("refresh: ", refreshToken);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("error status: ", error.response.status);
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log("만료되었습니다 refresh Token 시도");
        try {
          const response = await axios.post(
            "http://3.36.131.236:8081/refresh-token",
            {
              headers: {
                Authorization_refresh: refreshToken,
              },
            }
          );

          accessToken = response.data.accessToken;

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (error) {
          console.error(
            "Refresh Token 이 만료되었습니다. 다시 로그인해주세요."
          );
          return Promise.reject(error);
        }
      }
    }
  );
  
  export default function OurAxios() {
	return api;
  }
  
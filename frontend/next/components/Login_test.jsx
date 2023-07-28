import axios from "axios";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// 이 파일은 테스트가 다 되면 _api.js 에 넣어야 함. 그리고 import api from "../../_api.js" 해야함.

const Login = () => {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [cookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtcookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [accessToken, setAccessToken] = useState([]);
  const [refreshToken, setRefreshToken] = useState([]);

  // accessToken 에 있는 expired 를 받아오기 위한 과정
  // if (accessToken){
  //   const [header, payload, signature] = String.prototype.split.call(accessToken, ".");
  //   var real_payload = Buffer.from(payload, 'base64');
  //   var result = JSON.parse(real_payload.toString())
  //   console.log(result);
  // }

  // axios 설정
  const api = axios.create({
    baseURL: "http://localhost:8081/",
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
            "http://localhost:8081/refresh-token",
            {
              refreshToken: refreshToken,
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

  async function login() {
    setAccessToken(cookies.at);
    setRefreshToken(rtcookies.rt);
  }

  async function getData() {
    try {
      const response = await api.get("/data");
      console.log("Data:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function Testing() {
    login()
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  }

  return <button onClick={Testing}> 가보자!! </button>;
};

export default Login;

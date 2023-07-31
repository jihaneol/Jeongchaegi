import axios from "axios";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ourAxios from "../config/ourAxios";

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

  const api = ourAxios();

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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../../../components/Nav";
import style from "../../../styles/Signup.module.css";
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';

import { useCookies } from "react-cookie";
import GetPersonalInfo from "../../../components/GetPersonalInfo";
import GetTypeInfo from "../../../components/GetTypeInfo";
import OurAxios from "../../../config/ourAxios";
import { useRouter } from "next/router";

export default function UserInfo() {
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const userData = useSelector((state) => state.user);
  const api = OurAxios();
  const router = useRouter();

  function getToken() {
    console.log(atCookies);
    return atCookies.at;
  }

  function submitUserInfo() {
    console.log("birth: ", userData.birth);
    console.log("city: ", userData.city);
    console.log("age: ", typeof(userData.age));
    console.log("nickname: ", userData.nickname);
    console.log("types: ", userData.policyType);
    console.log(localStorage.getItem("accessToken"));
    api.post("/members/signup", {
      policyTypes: userData.policyType,
      age: userData.age,
      city: userData.city,
      nickname: userData.nickname,
    }).then(() => {
      router.push("/login/success");
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const accessToken = getToken();
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [atCookies.at]);

  return (
    <div className={style.signup_wrapper}>
      <Nav />
      {/* 헤더 */}
      <div className={style.signup_container}>
        <div className={style.signup_header}>
          <div>회원가입</div>
          <div style={{	lineHeight: "80px"}}>
            <LooksOneRoundedIcon />
            <LooksTwoOutlinedIcon />
          </div>
        </div>
        {/* 개인 정보 입력 받는 란 */}
        <div className={style.signup_content_personal_info}>
          <GetPersonalInfo />
        </div>
        {/* 관심 있는 정책 입력 받는 란 */}
        <div className={style.signup_content_policy_type}>
          <GetTypeInfo />
        </div>
        {/* 가입 요청 보내기 */}
        <div className={style.signup_btn_wrapper}>
          <button onClick={submitUserInfo}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

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
    return atCookies.at;
  }

  function submitUserInfo() {
    if (userData.age < 18)
      alert("18세 미만은 가입할 수 없습니다.")
    else {
      api.post("/login/signup", {
        policyId: userData.policyType,
        age: userData.age,
        city: userData.city,
        nickname: userData.nickname,
      }).then(() => {
        if (userData.age < 18 || userData.age > 99) {
          alert(`18세 이상 100세 미만의 회원은 추천 정책을 받아보실 수 없습니다.
          
          "마이페이지 -> 회원 정보 수정 탭"에서 수정할 수 있습니다.`)
        }
        router.push("/login/signup/success");
        localStorage.removeItem("accessToken");
      })
    }
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

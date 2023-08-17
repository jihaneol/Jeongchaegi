import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../../components/Nav";
import style from "../../../styles/Signup.module.css";
import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";

import { useCookies } from "react-cookie";
import GetPersonalInfo from "../../../components/GetPersonalInfo";
import GetTypeInfo from "../../../components/GetTypeInfo";
import OurAxios from "../../../config/ourAxios";
import { useRouter } from "next/router";

export default function UserInfo() {
  const api = OurAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  async function submitUserInfo() {
    const id = localStorage.getItem("userID");
    const nickname = localStorage.getItem("userName");
    api
      .put(`/members/${id}/edit/`, {
        policyId: userData.policyType,
        age: userData.age,
        city: userData.city,
        nickname: userData.nickname,
      })
      .then(() => {
        // 리덕스에 로그인 유저 정보 저장
        dispatch(userActions.setNickName(res.data.nickname));
        dispatch(userActions.setAge(res.data.age));
        dispatch(userActions.setCity(res.data.city));
        dispatch(userActions.setPolicyType(res.data.setPolicyType));
        //

        localStorage.setItem("userName", userData.nickname);
        localStorage.setItem("userAge", userData.age);
        localStorage.setItem("userCity", userData.city);
        localStorage.setItem("userPolicy", JSON.stringify(userData.policyType));
        alert("수정이 완료되었습니다.");
        router.push(`/mypage/${nickname}`);
      })
      .catch(() => {
        alert("모든 정보는 필수 입력값입니다.");
      });
  }

  return (
    <div className={style.signup_wrapper}>
      <Nav />
      {/* 헤더 */}
      <div className={style.signup_container}>
        <div className={style.signup_header}>
          <div>회원 정보 수정</div>
          <div style={{ lineHeight: "80px" }}>
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
          <button style={{ color: "white" }} onClick={submitUserInfo}>
            수정
          </button>
          <button
            style={{ backgroundColor: "white", border: "1px solid skyblue" }}
            onClick={submitUserInfo}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

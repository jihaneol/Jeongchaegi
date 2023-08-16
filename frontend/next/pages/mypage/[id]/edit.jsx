import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const userData = useSelector((state) => state.user);

  async function submitUserInfo() {
    const accessToken = localStorage.getItem("accessToken");
    api.put(
      `/members/${router.query.id}/edit/`,
      {
        policyId: userData.policyType,
        age: userData.age,
        city: userData.city,
        nickname: userData.nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
			console.log("수정 성공");
			console.log(res);
			localStorage.setItem("userName", res.data.nickname);
			localStorage.setItem("userAge", res.data.age);
			localStorage.setItem("userCity", res.data.city);
			localStorage.setItem("userImg", res.data.img);
			localStorage.setItem("userID", res.data.userId);
			localStorage.setItem("userPolicy", JSON.stringify(res.data.policyMemberDTO));
		}).catch((err) => {
			console.log("수정 실패");
			console.log(err);
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

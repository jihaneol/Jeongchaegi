import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sido } from "../../components/SelectPlace";
import Nav from "../../components/Nav";
import style from "../../styles/Signup.module.css";

import { userActions } from "../../store/user";
import { useCookies } from 'react-cookie';
import GetPersonalInfo from "../../components/GetPersonalInfo";

export default function UserInfo() {
	const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const userData = useSelector(state => state.user);

  function getToken() {
    console.log(atCookies);
    return atCookies.at;
  }

  function submitUserInfo() {
    console.log(userData.birth);
    console.log(userData.city);
    console.log(userData.age);
    console.log(userData.nickname);
  }
  
  useEffect(() => {
    const accessToken = getToken();
    if (accessToken)
      localStorage.setItem("accessToken", accessToken);
  }, [atCookies.at])


  return (
    <div className={style.signup_wrapper}>
      <Nav />
      <div className={style.signup_container}>
        <div className={style.signup_header}>
          {`회원가입`}
        </div>
        <div className={style.signup_content_personal_info}>
          <GetPersonalInfo /> 
        </div>
        <div className={style.signup_content_policy_type}>

        </div>
        <div className={style.signup_btn_wrapper}>
          <button onClick={submitUserInfo}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

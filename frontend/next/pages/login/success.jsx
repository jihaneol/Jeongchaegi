import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OurAxios from "../../config/ourAxios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userActions } from "../../store/user";
import Spin from "../../components/Spin";
import style from "../../styles/Login.module.css";

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [ktCookies, setktCookie, removektCookie] = useCookies(["kt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);

  const userData = useSelector((state) => state.user);
  const api = OurAxios();
  const router = useRouter();
  const dispatch = useDispatch();

  async function setToken() {
    if (atCookies && rtCookies) {
      localStorage.setItem("accessToken", atCookies.at);
      localStorage.setItem("refreshToken", rtCookies.rt);
      localStorage.setItem("kakaoToken", ktCookies.kt);
      setTokenReceive(true);
    }
  }

  function getLoginData() {
    api
      .get("/members/info/")
      .then((res) => {
        // 리덕스에 로그인 유저 정보 저장
        dispatch(userActions.setNickName(res.data.nickname));
        dispatch(userActions.setCity(res.data.city));
        dispatch(userActions.setAge(res.data.age));
        dispatch(userActions.setId(res.data.userId));
        dispatch(userActions.setImg(res.data.img));
        dispatch(userActions.setPolicyType(res.data.setPolicyType));
        //

        // 로컬스토리지에 정보 저장
        console.log(res);
        localStorage.setItem("userName", res.data.nickname);
        localStorage.setItem("userAge", res.data.age);
        localStorage.setItem("userCity", res.data.city);
        localStorage.setItem("userImg", res.data.img);
        localStorage.setItem("userID", res.data.userId);
        localStorage.setItem(
          "userPolicy",
          JSON.stringify(res.data.policyMemberDTO)
        );
        // 전역으로 로그인 정보 저장
        dispatch(userActions.setisLogined(true));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    async function fetchData() {
      await setToken();
      getLoginData();
    }
    fetchData().then(() => {
      router.push("/");
    });
  }, []);

  return (
    <div className={style.success_wrapper}>
      <Spin />
    </div>
  );
}

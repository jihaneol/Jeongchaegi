import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OurAxios from "../../config/ourAxios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userActions } from "../../store/user";
import Spin from "../../components/Spin";
import style from "../../styles/Login.module.css"

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);

	const userData = useSelector(state => state.user);
	const api = OurAxios();
	const router = useRouter();
	const dispatch = useDispatch();

  async function setToken() {
    console.log("setToken in...");
    if (atCookies && rtCookies) {
      localStorage.setItem("accessToken", atCookies.at);
      localStorage.setItem("refreshToken", rtCookies.rt);
			setTokenReceive(true);
    }
  }

	function getLoginData()	{
		console.log("api get gogo");
		api.get("/members/info/").then((res) => {
			// 로컬스토리지에 정보 저장
			console.log(res);
			localStorage.setItem("userName", res.data.nickname);
			localStorage.setItem("userAge", res.data.age);
			localStorage.setItem("userCity", res.data.city);
			localStorage.setItem("userImg", res.data.img);
			localStorage.setItem("userID", res.data.userId);
			localStorage.setItem("userPolicy", JSON.stringify(res.data.policyMemberDTO));
			// 전역으로 로그인 정보 저장
			dispatch(userActions.setisLogined(true));
		}).catch((err) => {
			console.log(err);
		})
	}

	

	useEffect(() => {
		async function fetchData() {
			await setToken();
			getLoginData();
		}
		fetchData().then(() => {
			// router.push("/");
		});
	}, []);
	

  return (<div className={style.success_wrapper}>
		<Spin />
	</div>);
}

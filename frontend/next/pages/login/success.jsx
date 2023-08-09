import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OurAxios from "../../config/ourAxios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);

	const userData = useSelector(state => state.user);
	const api = OurAxios();
	const router = useRouter();

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
			localStorage.setItem("userNickName", res.data.nickname);
			localStorage.setItem("userAge", res.data.age);
			localStorage.setItem("userCity", res.data.city);
			// localStorage.setItem("userProfilePicture", res.data.)
			// localStorage.setItem("")
			router.push("/");
		}).catch((err) => {
			console.log(err);
		})
	}

	useEffect(() => {
		async function fetchData() {
			await setToken();
			getLoginData();
		}
		fetchData();
	}, []);
	

  return (<div>
		{!tokenReceive ? <h1>loading...</h1> : <h1>Complete!</h1>}
	</div>);
}

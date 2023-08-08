import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OurAxios from "../../config/ourAxios";
import { useSelector } from "react-redux";

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);

	const userData = useSelector(state => state.user);
	const api = OurAxios();

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
			userData.nickname = res.data.nickname;
			userData.city = res.data.city;
			userData.age = res.data.age;
			userData
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

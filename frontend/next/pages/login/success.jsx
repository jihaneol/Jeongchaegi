import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OurAxios from "../../config/ourAxios";

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);
	const [loginData, setLoginData] = useState([]);

	const api = OurAxios();

  async function setToken() {
    console.log("setToken in...");
    if (atCookies && rtCookies) {
      localStorage.setItem("accessToken", atCookies.at);
      localStorage.setItem("refreshToken", rtCookies.rt);
    }
  }

	function getLoginData()	{
		console.log("api get gogo");
		api.get("/members/info/").then((res) => {
			setLoginData(res);
			console.log(res);
		}).catch((err) => {
			console.log(err);
		})
	}

	useEffect(() => {
		async function fetchData() {
			await setToken();
			setTokenReceive(true);
			getLoginData();
		}
	
		fetchData();
	}, [loginData]);
	

  return (<div>
		{!tokenReceive ? <h1>loading...</h1> : <h1>Complete!</h1>}
	</div>);
}

import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Success() {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
  const [tokenReceive, setTokenReceive] = useCookies(false);

  async function setToken() {
    console.log("setToken in...");
    if (atCookies && rtCookies) {
      localStorage.setItem("accessToken", atCookies.at);
      localStorage.setItem("refreshToken", rtCookies.rt);
    }
  }

  useEffect(() => {
    setToken().then(() => {
      setTokenReceive(true);
    });
  }, []);

  return (<div>
		{!tokenReceive ? <h1>loading...</h1> : <h1>Complete!</h1>}
	</div>);
}

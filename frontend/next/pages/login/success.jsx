import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Success() {
	// useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
	const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
	const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
	const [tokenReceive, setTokenReceive] = useCookies(false);
	const router = useRouter();
  
	async function setToken() {
		console.log("setToken in...");
		if (atCookies && rtCookies){
			localStorage.setItem("accessToken", atCookies.at);
			localStorage.setItem("refreshToken", rtCookies.rt);
		}
	}

	useEffect(() => {
		setToken().then(() => {
			setTokenReceive(true);
		});
	},[])

  return (
		<div>
			{!tokenReceive ? (<h1>Loading...</h1>) : (<h1>회원가입이 완료되었습니다.</h1>)}
		</div>
  )
}

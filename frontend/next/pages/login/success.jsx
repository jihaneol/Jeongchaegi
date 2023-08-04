import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Success() {
	// useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
	const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
	const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
	const router = useRouter();
  
	
  
	async function login() {
	  localStorage.setItem("accessToken", atCookies.at);
	  localStorage.setItem("refreshToken", rtCookies.rt);
	}

	useEffect(() => {
		login().then(() => {
			router.push("/");
		})
	})

  return (
		<div>Loading...</div>
  )
}

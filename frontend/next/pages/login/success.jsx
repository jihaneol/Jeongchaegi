import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Success() {
	// useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
	const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
	const [rtCookies, setrtCookie, removertCookie] = useCookies(["rt"]);
	const router = useRouter();
  
	// accessToken 에 있는 expired 를 받아오기 위한 과정
	// if (accessToken){
	//   const [header, payload, signature] = String.prototype.split.call(accessToken, ".");
	//   var real_payload = Buffer.from(payload, 'base64');
	//   var result = JSON.parse(real_payload.toString())
	//   console.log(result);
	// }
  
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

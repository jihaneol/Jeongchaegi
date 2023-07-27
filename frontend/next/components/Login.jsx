import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const Login = () => {
  // useCookies 훅을 사용하여 쿠키 객체를 받아옵니다.
  const [cookies, setCookie, removeCookie] = useCookies(['at']);
  const [accessToken, setAccessToken] = useState([]);

  // 컴포넌트가 마운트되면 실행되는 useEffect를 사용하여 쿠키 값을 콘솔에 출력합니다.
  useEffect(() => {
	setAccessToken(cookies.at);
  }, [cookies]);

  console.log(typeof(accessToken))
  console.log(accessToken)
  if (accessToken){
	  const [header, payload, signature] = String.prototype.split.call(accessToken, ".");
	  console.log("header", header);
	  console.log("payload", payload);
	  console.log("signature", signature);
	  var real_payload = Buffer.from(payload, 'base64'); 
	  var result = JSON.parse(real_payload.toString())
	  console.log(result);
  }


  return (
    <div>
      <p>Check the browser console to see the 'at' cookie value.</p>
    </div>
  );
};

export default Login;

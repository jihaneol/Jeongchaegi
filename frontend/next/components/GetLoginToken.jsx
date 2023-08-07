import { useEffect, useState } from "react";

export default function GetLoginToken() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });

  // accessToken 에 있는 expired 를 받아오기 위한 과정
  // if (accessToken){
  //   const [header, payload, signature] = String.prototype.split.call(accessToken, ".");
  //   var real_payload = Buffer.from(payload, 'base64');
  //   var result = JSON.parse(real_payload.toString())
  //   console.log(result);
  // }

  async function getToken() {
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
  }

  useEffect(() => {
    getToken().then(() => {
      setTokens({ accessToken, refreshToken });
      console.log("access: ", accessToken, "refresh: ", refreshToken);
    });
  }, [accessToken, refreshToken]);

  return tokens;
}

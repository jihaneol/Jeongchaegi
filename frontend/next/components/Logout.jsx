import React, { useEffect, useState } from "react";
import OurAxios from "../config/ourAxios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

export default function Logout() {
  const [tokens, setTokens] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTokens(localStorage.getItem("refreshToken"));
  }, []);

  async function Logout() {
    const api = OurAxios();
    api
      .delete("/login/logout/", {
        headers: {
          Authorization_refresh: `Bearer ${tokens}`,
        },
      })
      .then(() => {
        dispatch(userActions.setLogout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("kakaoToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userAge");
        localStorage.removeItem("userCity");
        localStorage.removeItem("userImg");
        localStorage.removeItem("userID");
        localStorage.removeItem("userPolicy");
        dispatch(userActions.setisLogined(false));
        console.log("끝!");
      });
  }

  return Logout;
}

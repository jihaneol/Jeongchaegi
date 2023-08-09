import React, { useEffect, useState } from "react";
import OurAxios from "../config/ourAxios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

export default function Logout() {
	const [tokens, setTokens] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		setTokens(localStorage.getItem("refreshToken"));
	}, [])

  async function Logout() {
    const api = OurAxios();
    api.delete("/members/logout/", {
      headers: {
        Authorization_refresh: `Bearer ${tokens}`,
      },
    }).then(() => {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("userName");
			localStorage.removeItem("userAge");
			localStorage.removeItem("userCity");
			localStorage.removeItem("userImg");
			localStorage.removeItem("userID");
			localStorage.removeItem("userPolicy");
			dispatch(userActions.setisLogined(false));
		}).then(() => {
			alert("정상적으로 로그아웃 되었습니다.")
		});
  }

	return Logout;
}

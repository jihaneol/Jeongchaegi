import React, { useEffect, useState } from "react";
import OurAxios from "../config/ourAxios";

export default function Logout() {
	const [tokens, setTokens] = useState("");

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
			router.push("/");
		});
  }

	return Logout;
}

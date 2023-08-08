import React, { useEffect, useState } from "react";
import OurAxios from "../config/ourAxios";

export default function Logout() {
	const [tokens, setTokens] = useState({refreshToken: ""});

	useEffect(() => {
		setTokens(localStorage.getItem("refreshToken"));
	}, [])

  async function Logout() {
    const api = OurAxios();
    api.post("/members/logout/", {
      headers: {
        Authorization_refresh: `Bearer ${tokens.refreshToken}`,
      },
    }).then(() => {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		});
  }

	return Logout;
}

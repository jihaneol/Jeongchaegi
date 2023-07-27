import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

export default function Login() {
	const [cookie, setCookie] = useState();
	useEffect(() => {
		const redirectURL = "";
		window.location.href = redirectURL;
	}, [])

	useEffect(() => {
		const myCookie = Cookies.get('');

		if (myCookie) {
			setCookie(myCookie);
			console.log("Received Cookie:", myCookie);
		}
	}, [])

  return (
		<div>
			{cookie}
		</div>
  )
}

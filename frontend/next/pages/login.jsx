import React from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import Nav from "../components/Nav"
import Login_test from "../components/Login_test"

function KakaoLoginOrSignup() {
  return (
    <div className={styles.all_wrapper}>
		<Nav />
		<Login_test />
		<div className={styles.content_container}>
			<div className={styles.head_wrapper}>header</div>
			<div className={styles.content_wrapper}>
				<div className={styles.text_wrapper}>카카오 로그인으로 모든 기능 이용하기</div>
				<div className={styles.kakao_wrapper}>
					<a href="http://localhost:8081/oauth2/authorization/kakao">
						<Image src="/kakao_login_large_wide.png" width="480px" height="72px" alt="카카오 로그인"/>
					</a>
				</div>
			</div>
			<div className={styles.signup_wrapper}>
				계정이 없으신가요?
				<a> 가입하기</a>
			</div>
		</div>
		{/* <div className={styles.footer_wrapper}>
			footer
		</div> */}
    </div>
  );
}

export default function Login() {
  return (
    <>
      <KakaoLoginOrSignup />
    </>
  );
}

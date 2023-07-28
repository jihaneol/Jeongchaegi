import React from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";

function KakaoLoginOrSignup() {
  return (
    <div className={styles.all_wrapper}>
			<div className={styles.content_container}>
				<div className={styles.head_wrapper}>header</div>
				<div className={styles.content_wrapper}>
					<div className={styles.kakao_wrapper}>
						<a href="http://localhost:8081/oauth2/authorization/kakao">
							<Image src="/kakao_login_large_wide.png" width="480px" height="72px" alt="카카오 로그인"/>
						</a>
					</div>
					<div className={styles.signup_wrapper}>Sign up</div>
				</div>
				<div className={styles.footer_wrapper}>
					footer
				</div>
			</div>
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

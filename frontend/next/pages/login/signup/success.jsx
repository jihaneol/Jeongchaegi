import React, { useEffect } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/Signup.module.css"
import { useSelector } from "react-redux";
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';

export default function Success() {
	const userData = useSelector(state => state.user);
  const router = useRouter();

	console.log("login/signup/success");

  return (
    <div className={style.success_wrap}>
				<div className={style.success_container}>
					<div className={style.success_header}>
						<div>가입 완료</div>
						<div style={{	lineHeight: "80px"}}>
							<LooksOneOutlinedIcon />
							<LooksTwoRoundedIcon />
						</div>
					</div>
					<div className={style.success_content}>
						<div>{userData.nickname}님,</div>
						<h5>정채기 회원가입을 진심으로 환영합니다.</h5>
					</div>
					<div className={style.success_button_wrapper}>
						<button onClick={() => router.push("/")} style={{backgroundColor: "white"}}>홈으로</button>
						<button onClick={() => router.push("/login")} style={{backgroundColor: "#9FB9FD", color: "white"}}>로그인하기</button>
					</div>
				</div>
    </div>
  );
}

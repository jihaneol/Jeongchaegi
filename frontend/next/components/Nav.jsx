import style from "../styles/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { useEffect, useState } from "react";

export default function Nav() {
  const [nickname, setNickname] = useState("");
  const logout = Logout();

  useEffect(() => {
    setNickname(localStorage.getItem("userNickName"));
    console.log(localStorage.getItem("userNickName"));
  }, [])

  return (
    <div className={style.nav_wrap}>
      <div className={style.nav_menu}>
        <Link href="/">
          <a>
            <Image src="/Logo.PNG" width="130px" height="64px" alt="정채기" />
          </a>
        </Link>

        <Link href="/articlelist">
          <a>게시판</a>
        </Link>

        <Link href="/policylist">
          <a>정책 리스트</a>
        </Link>

        {/* 일단 기본값 1로 라우팅 */}
        <Link href={`/mypage/${nickname}`}>
          <a>My Page</a>
        </Link>
      </div>

      {/* {at ? ( */}
        <Link href="/login">
          <a className={style.nav_login}>Login</a>
        </Link>
      {/* // ) : (
      //   <button className={style.nav_logout} onClick={logout}>
      //     Logout
      //   </button>
      )} */}
    </div>
  );
}

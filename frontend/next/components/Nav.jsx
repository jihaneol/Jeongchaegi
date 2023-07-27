import React from "react";
import nav_styles from "../styles/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Login from "./Login";

export default function Nav() {
  function onClick() {
    axios({
      method: "get",
      url: "http://localhost:8080/oauth2/authorization/kakao",
    }).then((res) => {
      console.log(res);
    })
  }
  return (
    <div className={nav_styles.nav_wrap}>
      <div className={nav_styles.nav_menu}>
        {/* <Link href="/" className={nav_styles.nav_logo}></Link> */}

        <Link href="/">
          <a>
            <Image src="/Logo.PNG" width="130px" height="64px" alt="정채기"/>
          </a>
        </Link>

        <Link href="/ArticleList">
          <a>게시판</a>
        </Link>

        <Link href="/PolicyList">
          <a>정책 리스트</a>
        </Link>

        {/* 일단 기본값 1로 라우팅 */}
        <Link href="/mypage/1">  
          <a>My Page</a>
        </Link>
        
      </div>
      <a href="http://localhost:8080/oauth2/authorization/kakao" className={nav_styles.nav_login}>Login</a>
    </div>
  );
}

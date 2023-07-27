import React from "react";
import styles from "../styles/Nav.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <div className={styles.nav_wrap}>
      <div className={styles.nav_menu}>
        {/* <Link href="/" className={styles.nav_logo}></Link> */}

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
      <Link href="/login" >
        <a className={styles.nav_login}>
          Login
        </a>
      </Link>
    </div>
  );
}

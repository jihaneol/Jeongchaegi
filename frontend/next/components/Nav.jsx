import React from "react";
import nav_styles from "../styles/Nav.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={nav_styles.nav_wrap}>
      <div className={nav_styles.nav_menu}>
        {/* <Link href="/" className={nav_styles.nav_logo}></Link> */}
        {/* 이미지 없어서 오류 뜸 */}

        <Link href="/">
          <a>home</a>
        </Link>

        <Link href="/policylist">
          <a>policylist</a>
        </Link>

        <Link href="/policyitem">
          <a>policyitem</a>
        </Link>
        
      </div>
      <div className={nav_styles.nav_login}>Login</div>
    </div>
  );
}

import React from 'react'
import nav_styles from "../styles/Nav.module.css"
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className={nav_styles.nav_wrap}>
      <div className={nav_styles.nav_menu}>
        <Link to={"/"} className={nav_styles.nav_logo}></Link>
        <Link to="/list" >정책 </Link>
        <Link to="/calendar" >스토리</Link>
        <Link to="/calendar" >익명 게시판</Link>
        <Link to="/calendar" >후원</Link>
      </div>
      <div className={nav_styles.nav_login}>
        Login
      </div>
    </div>
  )
}

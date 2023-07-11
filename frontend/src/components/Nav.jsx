import React from 'react'
import Nav_style from "../styles/Nav.module.css"

export default function Nav() {
  return (
    <div className={Nav_style.nav_wrap}>
      <div className={Nav_style.nav_menu}>
        로고(홈)
        정책list
        calendar
      </div>
      <div>
        Login
      </div>
    </div>
  )
}

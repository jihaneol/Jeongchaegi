import React from 'react'
import nav_styles from "../styles/Nav.module.css"

export default function Nav() {
  return (
    <div className={nav_styles.nav_wrap}>
      <div className={nav_styles.nav_menu}>
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

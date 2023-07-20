import React from 'react'
import header_styles from "../styles/Header.module.css"

export default function Header() {
  return <div className={header_styles.header_wrap}>
	<div className={header_styles.header_text}>[공지] 심경섭 SAMSUNG 신입공채 합격!!!</div>
  </div>;
}

import React from 'react'
import Nav from "./Nav"
import Search from "./Search"
import home_styles from "../styles/Home.module.css"

export default function Home() {
  return (
	<div className={home_styles.home_wrap}>
        <Nav />
        <Search />
	</div>
  )
}

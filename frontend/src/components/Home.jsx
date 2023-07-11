import React from 'react'
import Nav from "./Nav"
import Search from "./Search"
import home_styles from "../styles/Home.module.css"

function Home_calendar() {
	return (
		<div className={home_styles.home_calendar_wrap}>
			<div>
				Home_calendar
			</div>
		</div>
	)
}

export default function Home() {
  return (
	<div className={home_styles.home_wrap}>
        <Nav />
        <Search />
		<Home_calendar />
	</div>
  )
}

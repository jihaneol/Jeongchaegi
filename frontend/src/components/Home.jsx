import React from 'react'
import Nav from "./Nav"
import Search from "./Search"
import home_styles from "../styles/Home.module.css"

function HomeCalendar() {
	return (
		<div className={home_styles.home_calendar_wrap}>
			<div className={home_styles.home_calendar_center}>
				HomeCalendarCenter
			</div>
		</div>
	)
}

export default function Home() {
  return (
	<div className={home_styles.home_wrap}>
        <Nav />
        <Search />
		<HomeCalendar />
	</div>
  )
}

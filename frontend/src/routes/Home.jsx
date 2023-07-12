import React from 'react'
// import Nav from "../components/Nav"
import Search from "../components/Search"
import HotPost from '../components/HotPost'
import home_styles from "../styles/Home.module.css"
import Deadline from '../components/Deadline'

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
        <Search />
		<HomeCalendar />
		<div className={home_styles.home_lower_wrap}>
			<HotPost />
			<Deadline />
		</div>
	</div>
  )
}

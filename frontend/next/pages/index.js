import HomeCalendar from "../components/HomeCalendar"
import HomeList from "../components/HomeList"
import Nav from "../components/Nav"
import style from "../styles/Home.module.css"

export default function Home() {
	return (
	<div>
    <Nav />
		<div className={style.home_wrapper}>
      <div className={style.calendar_wrapper}>
        <HomeCalendar />
      </div>
      <div className={style.outer_wrapper}>
        <HomeList title="마감 임박 정책"/>
        <HomeList title="Hot 정책"/>
      </div>
    </div>
	</div>
	)
}
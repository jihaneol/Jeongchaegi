import React from "react";
import Search from "../components/Search";
import HotPost from "../components/HotPost";
import home_styles from "../styles/Home.module.css";
import Deadline from "../components/Deadline";
import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';

function HomeCalendar() {
  function calendarClick(v) {
    console.log(v);
  }
  return (
    <div className={home_styles.home_calendar_wrap}>
      <Calendar 
      onClickDay={calendarClick}
      className={home_styles.home_calendar_center}
      />
    </div>
  );
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
  );
}

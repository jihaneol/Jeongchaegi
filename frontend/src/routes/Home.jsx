import React from "react";
import Search from "../components/Search";
import HotPost from "../components/HotPost";
import home_styles from "../styles/Home.module.css";
import Deadline from "../components/Deadline";
import HomeCalendar from "../components/HomeCalendar";


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

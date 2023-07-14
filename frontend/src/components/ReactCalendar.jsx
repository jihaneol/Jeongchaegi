import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../styles/HomeCalendar.css";
import home_styles from "../styles/Home.module.css";


export default function ReactCalendar({position}) {
  const [pos, setPos] = useState("");
  useEffect(() => {
    setPos(position);
  }, [position])
  function calendarClick(v) {
    console.log(v);
  }
  return (
    <Calendar
      minDetail="month"
      maxDetail="month"
      nextLabel={null}
      prevLabel={null}
      next2Label={null}
      prev2Label={null}
      showNeighboringMonth={false}
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      onClickDay={calendarClick}
	  className={`${home_styles.home_calendar_component} ${home_styles[pos]}`}
    />
  );
}

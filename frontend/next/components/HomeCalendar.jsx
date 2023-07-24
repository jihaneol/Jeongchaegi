import React, { useEffect, useState } from "react";
import ReactCalendar from "./ReactCalendar";
import style from "../styles/Home.module.css";

export default function HomeCalendar() {
  const [targetMonth, setTargetMonth] = useState(new Date().getMonth());
  const [today, setToday] = useState(new Date());
  const year = today.getFullYear();
  const day = today.getDate();

  function onClickLeft() {
    setTargetMonth(targetMonth - 1);
  }
  function onClickRight() {
    setTargetMonth(targetMonth + 1);
  }
  return (
    <div className={style.calendar_wrapper}>
      <ReactCalendar
        position="left"
        month={targetMonth - 1}
        year={year}
        day={day}
      />
      <button
        className={`react_calendar_side_position_btn react_calendar_left`}
        onClick={onClickLeft}
      ></button>
      <ReactCalendar
        position="center"
        month={targetMonth}
        year={year}
        day={day}
      />
      <button
        className={`react_calendar_side_position_btn react_calendar_right`}
        onClick={onClickRight}
      ></button>
      <ReactCalendar
        position="right"
        month={targetMonth + 1}
        year={year}
        day={day}
      />
    </div>
  );
}

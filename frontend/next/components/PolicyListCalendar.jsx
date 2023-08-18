import React, { useState } from "react";
import style from "../styles/PolicyList.module.css";
import Calendar from "react-calendar";

export default function PolicyListCalendar({ onClickDay, targetDate }) {

  return (
    <Calendar
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      className={`${style.fixed_calendar}`}
      minDetail="month"
      maxDetail="month"
      next2Label={null}
      prev2Label={null}
      showNeighboringMonth={false}
      value={targetDate}
      onClickDay={onClickDay}
    />
  );
}

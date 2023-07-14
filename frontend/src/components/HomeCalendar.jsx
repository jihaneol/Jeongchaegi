import { useEffect, useState } from "react";
import home_styles from "../styles/Home.module.css";
import "../styles/HomeCalendar.css";
import Calendar from "react-calendar";

function ReactCalendar({ position, month, year, day }) {
  const [pos, setPos] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [targetDay, setTargetDay] = useState(day);

  useEffect(() => {
    setPos(position);
  }, [position]);

  useEffect(() => {
    const newDate = new Date(year, month, targetDay);
    setTargetDate(newDate);
  }, [month, year, targetDay]);

  function calendarClick(v) {
    console.log(v.getDate());
    setTargetDay(v.getDate());
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
      value={targetDate}
      onClickDay={calendarClick}
      className={`${home_styles.home_calendar_component} ${home_styles[pos]} `}
    />
  );
}

export default function HomeCalendar() {
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const year = today.getFullYear();
  const day = today.getDate();

  useEffect(() => {
    setToday(new Date());
  }, []);

  function clickLeftMonth() {
    setMonth(month - 1);
  } 

  function clickRightMonth() {
    setMonth(month + 1);
  }

  return (
    <div className={home_styles.home_calendar_wrap}>
      <ReactCalendar position="center" month={month} year={year} day={day} />
      <ReactCalendar position="left" month={month - 1} year={year} day={day} />
      <button
        onClick={clickLeftMonth}
        className={`${home_styles.left} ${home_styles.home_calendar_component} ${home_styles.home_calendar_btn}`}
        />
      <ReactCalendar position="right" month={month + 1} year={year} day={day} />
      <button
        onClick={clickRightMonth}
        className={`${home_styles.right} ${home_styles.home_calendar_component} ${home_styles.home_calendar_btn}`}
      />
    </div>
  );
}

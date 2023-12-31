import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function ReactCalendar({
  position,
  year,
  month,
  day,
  modalActive,
  getTargetDate,
}) {
  const [targetDate, setTargetDate] = useState(new Date());
  const [targetDay, setTargetDay] = useState(day);

  const router = useRouter();

  useEffect(() => {
    setTargetDate(new Date(year, month, targetDay));
  }, [month, targetDay]);

  function clickCalendar(event) {
    setTargetDay(event.getDate());
    modalActive(true);
    getTargetDate(event);
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
      value={position === "center" ? targetDate : null}
      className={`react_calendar_component react_calendar_${position}`}
      activeStartDate={targetDate}
      onClickDay={clickCalendar}
    />
  );
}

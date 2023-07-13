import ReactCalendar from "react-calendar";
import '../styles/HomeCalendar.css'
import home_styles from "../styles/Home.module.css";

export default function HomeCalendar() {
  function calendarClick(v) {
    console.log(v);
  }
  return (
    <div className={home_styles.home_calendar_wrap}>
      <ReactCalendar
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
        className={home_styles.home_calendar_center}
      />
    </div>
  );
}

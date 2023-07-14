import home_styles from "../styles/Home.module.css";
import ReactCalendar from './ReactCalendar';

export default function HomeCalendar() {
  return (
    <div className={home_styles.home_calendar_wrap}>
      <ReactCalendar
        position="center"
      />
      <ReactCalendar
        position="left"
      />
      <ReactCalendar
        position="right"
      />
    </div>
  );
}

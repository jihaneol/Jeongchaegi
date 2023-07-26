import React from "react";
import styles from "../styles/PolicyList.module.css";

export default function PolicyFilter({ isCalendarActive, calendarBtnClick }) {
  // 필터 리스트 - 필터 종류 늘어날 때마다 여기에 추가
  const filterList = ["Default1", "Default2", "Default3"]

  return (
    <div className={styles.filter_wrapper}>
      <div className={styles.filter_header}>
        Filter
        <button
          className={`${styles.filter_calendar_btn} ${
            isCalendarActive === true
              ? styles.calendar_btn_on
              : styles.calendar_btn_off
          }`}
          onClick={calendarBtnClick}
        >
          Calendar
        </button>
      </div>
      <div className={styles.policy_filter_list_wrapper}>
        {filterList.map((filter, idx) => (
          <PolicyFilterList key={idx} title={filter} />
        ))}
      </div>
    </div>
  );
}

function PolicyFilterList({ title }) {
  return (
    <div className={`form-check ${styles.filter}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {title}
      </label>
    </div>
  );
}

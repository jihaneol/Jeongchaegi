import React, { useState } from "react";
import style from "../styles/PolicyList.module.css";
import axios from "axios";

export default function PolicyFilter({ isCalendarActive, calendarBtnClick }) {
  // 필터 리스트 - 필터 종류 늘어날 때마다 여기에 추가
  const filterList = ["Default1", "Default2", "Default3"];
  const [myFilter, setMyFilter] = useState({
    type:'',  // select
    region:'',  // select
    age:'',  // input int
    keyword:'',  // input text
    date:'',  // calendar
  })

  return (
    <div className={style.filter_wrapper}>
      <div className={style.filter_header}>
        Filter
        <div className={style.filter_calendar_wrapper}>
          {/* 캘린더 토글 버튼 */}
          <div>calendar</div>
          <button
            className={`${style.filter_calendar_btn} ${
              isCalendarActive === true
                ? style.calendar_btn_on
                : style.calendar_btn_off
            }`}
            onClick={calendarBtnClick}
          >
            <div
              className={`${style.toggle} ${
                isCalendarActive === true ? style.toggle_on : style.toggle_off
              }`}
            />
          </button>
        </div>
      </div>
      <div className={style.policy_filter_list_wrapper}>
        {filterList.map((filter, idx) => (
          <PolicyFilterList key={idx} title={filter} />
        ))}
      </div>
    </div>
  );
}

function PolicyFilterList({ title }) {
  return (
    <div className={`form-check ${style.filter}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={title}
      />
      <label className="form-check-label" htmlFor={title}>
        {title}
      </label>
    </div>
  );
}

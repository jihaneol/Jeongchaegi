import React, { useEffect, useState } from "react";
import style from "../styles/PolicyList.module.css";
import axios from "axios";
import SelectPlace from "./SelectPlace";

let searchAge = "";
let selectPcyTypes = [];

export default function PolicyFilter({ isCalendarActive, calendarBtnClick }) {
  const [typedata, setTypeData] = useState();

  useEffect(() => {
    // 시작할때 타입 가져옴
    selectPcyTypes = []; // 시작할때 비움
    searchAge = ""; // 시작할때 비움
    axios({
      method:'get',
      url:'http://3.36.131.236:8081/api/policies/type',
    })
    .then((res)=>{
      setTypeData(res.data)
    })
  },[])

  function handleAge(e) {
    // 타겟 바뀌면 그것을 위에 searchAge 변수에 담음, 그리고 맨 아래서 export함
    const curAge = e.target.value;
    searchAge = curAge;
  }

  function handleTypeChange(e) {
    // react문법 짜증나서 안씀, 그냥 자바스크립트
    const curId = e.target.id;
    const isChecked = selectPcyTypes.includes(curId);
    if (isChecked) {
      selectPcyTypes = selectPcyTypes.filter((el) => el !== curId);
    } else {
      selectPcyTypes.push(curId);
    }
  }

  return (
    <div className={style.filter_wrapper}>
      <div className={style.filter_header}>
        Filter
        <div className={`${style.filter_calendar_wrapper} d-none d-lg-flex`}>
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
        <div className="d-flex">
          {/* 정책 타입 필터 */}
          <h1>types</h1>
          {typedata
            ? typedata.map((item) => (
                <div className="form-check" key={item.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={item.id}
                    onClick={handleTypeChange}
                  />
                  <label className="form-check-label" htmlFor={item.id}>
                    {item.type}
                  </label>
                </div>
              ))
            : "loading..."}
        </div>
        {/* 지역 필터, 컴포넌트 */}
        <div className="d-flex">
          <h1>region</h1>
          <SelectPlace />
        </div>
        {/* 나이 필터, 인풋 */}
        <div className="d-flex">
          <h1>age</h1>
          <input type="number" onChange={handleAge} />
        </div>
      </div>
    </div>
  );
}

export { searchAge, selectPcyTypes };

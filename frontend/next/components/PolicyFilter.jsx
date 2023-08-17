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
      url:'http://3.36.131.236/api/policies/type',
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
    <div className="p-2">
      <div className="m-3 p-2 border border-gray-300 rounded bg-white" style={{padding :'1rem'}}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">필터</h2>
          <div className="flex items-center">
            {/* 캘린더 토글 버튼 */}
          <span>달력</span>
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
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <p className="text-md font-medium">분야 : </p>
            {typedata
              ? typedata.map((item) => (
                <label key={item.id} className="inline-flex items-center space-x-2">
                  <input
                    className="form-checkbox rounded"
                    type="checkbox"
                    id={item.id}
                    onClick={handleTypeChange}
                  />
                  <span>{item.type}</span>
                </label>
              ))
              : "loading..."}
          </div>
          <div className="flex items-center space-x-4">
            {/* 줄바꿈나서 강제로 크기 더 줌, 이게 맞나.... */}
            <p className="text-md font-medium" style={{width : '3rem'}}>지역 : </p>
            <SelectPlace />
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-md font-medium">신청 가능 연령 : </p>
            <input className="border p-2 rounded" type="number" onChange={handleAge} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { searchAge, selectPcyTypes };

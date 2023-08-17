import React, { useEffect, useState } from "react";
import style from "../styles/PolicyList.module.css";
import SelectPlace from "./SelectPlace";

let searchAge = "";
let selectPcyTypes = [];

const typesofpcy = [
  // 로딩하는거 좀 이상해서 이거 가져다 쓸게여;
  { index: "023010", name: "일자리" },
  { index: "023020", name: "주거" },
  { index: "023040", name: "복지ㆍ문화" },
  { index: "023050", name: "참여ㆍ권리" },
  { index: "023030", name: "교육" },
];

export default function PolicyFilter({ isCalendarActive, calendarBtnClick }) {
  const [typedata, setTypeData] = useState();

  useEffect(() => {
    // 시작할때 타입 가져옴
    searchAge = ""; // 시작할때 비움
  }, []);

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
    <div className="p-2" style={{paddingBottom: "0px"}} >
      <div
        className="m-3 p-2 border border-gray-300 rounded bg-white"
        style={{ padding: "1rem" }}
      >
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
            <div className="flex items-center">
              {typesofpcy.map((item) => (
                <label
                  key={item.index}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    id={item.index}
                    onClick={handleTypeChange}
                  />
                  <span className="pl-1 pr-3">{item.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* 줄바꿈나서 강제로 크기 더 줌, 이게 맞나.... */}
            <p className="text-md font-medium" style={{ width: "3rem" }}>
              지역 :{" "}
            </p>
            <div className="pt-2">
              <SelectPlace />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-md font-medium">신청 가능 연령 : </p>
            <input
              className="border p-2 rounded"
              type="number"
              onChange={handleAge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { searchAge, selectPcyTypes };

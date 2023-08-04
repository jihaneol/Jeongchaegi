import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GetBirth({getBirth}) {
	const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div>
      <label htmlFor="date">생년 월일: </label>
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={(date) => {
          const year = date.getFullYear() + "";
          const month =
            date.getMonth() + 1 > 9
              ? date.getMonth() + 1 + ""
              : "0" + (date.getMonth() + 1);
          const day =
            date.getDate() + 1 > 9
              ? date.getDate() + 1 + ""
              : "0" + (date.getDate() + 1);
          const new_date = year + month + day;
          setSelectedDate(date);
					getBirth(new_date)
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
      />
    </div>
  );
}

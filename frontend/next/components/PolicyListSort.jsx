import React, { useState } from "react";
import style from "../styles/PolicyList.module.css";
import Image from "next/image";

export default function PolicyListSort() {
  const [isAscending, setIsAscending] = useState(true);

  function test(v) {
    let value = v.target.value;
    console.log(v.target.value);
    if (value === "정렬 기준") console.log("pass");
  }

  function orderClick() {
    setIsAscending((prev) => !prev);
  }

  return (
    <div className={style.sort_wrap}>
      <select onChange={test}>
        <option>정렬 기준 </option>
        <option>hi2</option>
        <option>hi3</option>
        <option>hi4</option>
        <option>hi5</option>
      </select>
      <button onClick={orderClick}>
        {isAscending === true ? (
          <Image src="/ascending_icon.png" width="30px" height="30px" alt="오름차순" />
        ) : (
          <Image src="/descending_icon.png" width="30px" height="30px" alt="내림차순" />
        )}
      </button>
    </div>
  );
}
